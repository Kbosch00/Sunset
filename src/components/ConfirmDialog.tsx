"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description = "Esta acción no se puede deshacer.",
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) onCancel();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, loading, onCancel]);

  if (!open || !isClient) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-sm"
      onClick={() => {
        if (!loading) onCancel();
      }}
      role="presentation"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="w-full max-w-sm rounded-3xl border border-stone-200/80 bg-white/95 p-6 shadow-xl shadow-stone-300/30 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-title"
          className="font-display text-xl font-medium text-stone-800"
        >
          {title}
        </h2>
        <p
          id="confirm-desc"
          className="mt-2 text-sm leading-relaxed text-stone-500"
        >
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-full px-5 py-2.5 text-sm text-stone-600 transition hover:bg-stone-100 disabled:opacity-50 cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-full bg-rose-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-600 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Eliminando…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
