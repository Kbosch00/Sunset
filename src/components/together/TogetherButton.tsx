"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "../ConfirmDialog";

export function TogetherButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function handleConfirm() {
    setOpen(false);
    router.push("/together/pin");
  }

  return (
    <>
      <div className="fixed top-10 left-4 z-40 sm:bottom-24">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            flex h-10 w-10 items-center justify-center rounded-full
            border border-stone-200/80 bg-white/75
            shadow-md shadow-stone-300/20 backdrop-blur-md
            transition hover:bg-white cursor-pointer
          "
          aria-label="Sección privada"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path
                d="M8 11V7a4 4 0 0 1 8 0v4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>

      <ConfirmDialog
        open={open}
        title="¿Entrar a esta sección?"
        description="Vas a necesitar el PIN de esta sección aparte."
        confirmLabel="Continuar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
