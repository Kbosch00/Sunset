"use client";

import { useEffect } from "react";
import type { Writing } from "@/src/lib/writings";
import { formatWritingDate } from "@/src/lib/writings";

const AUTHOR_LABEL: Record<Writing["author"], string> = {
  Kev: "Kev",
  Ana: "Ana",
};

type Props = {
  writing: Writing;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
};

export function WritingLightbox({
  writing,
  onClose,
  onEdit,
  onDelete,
  deleting,
}: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-stone-900/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-stone-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex justify-end rounded-t-3xl bg-stone-50/95 px-4 pt-4 pb-2 backdrop-blur-sm sm:px-6 sm:pt-6">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-stone-200/80 px-3 py-1 text-sm text-stone-600 transition hover:bg-stone-300"
          >
            Cerrar
          </button>
        </div>

        <div className="px-6 pb-6 sm:px-10 sm:pb-10">
          <div className="mb-4 flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide ${
                writing.author === "Kev"
                  ? "bg-stone-100/80 text-stone-700"
                  : "bg-rose-200/70 text-rose-600"
              }`}
            >
              {AUTHOR_LABEL[writing.author]}
            </span>
            <time className="text-xs text-stone-400">
              {formatWritingDate(writing.createdAt)}
            </time>
          </div>

          <h2 className="font-display text-2xl font-medium wrap-break-word text-stone-800 sm:text-3xl">
            {writing.title}
          </h2>

          <p className="mt-6 whitespace-pre-line text-base wrap-break-word leading-relaxed text-stone-600">
            {writing.content}
          </p>

          <div className="mt-8 flex gap-2 border-t border-stone-200 pt-6">
            <button
              type="button"
              onClick={onEdit}
              className="cursor-pointer rounded-full bg-stone-100 px-5 py-2 text-sm text-stone-600 duration-300 transition-all hover:bg-stone-200"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="cursor-pointer rounded-full bg-rose-50 px-5 py-2 text-sm text-rose-600 duration-300 transition-all hover:bg-rose-100 disabled:opacity-50"
            >
              {deleting ? "Borrando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
