"use client";

import { useEffect } from "react";
import type { Writing } from "@/src/lib/writings";

const AUTHOR_LABEL: Record<Writing["author"], string> = {
  yo: "Él",
  ella: "Ella",
};

type Props = {
  writing: Writing;
  onClose: () => void;
};

export function WritingLightbox({ writing, onClose }: Props) {
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
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
      >
        Cerrar
      </button>

      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-stone-50 p-6 shadow-2xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide ${
              writing.author === "yo"
                ? "bg-rose-100/80 text-rose-700"
                : "bg-stone-200/70 text-stone-600"
            }`}
          >
            {AUTHOR_LABEL[writing.author]}
          </span>
          <time className="text-xs text-stone-400">{writing.date}</time>
        </div>

        <h2 className="font-display text-2xl font-medium text-stone-800 sm:text-3xl">
          {writing.title}
        </h2>

        <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-stone-600">
          {writing.content}
        </p>
      </div>
    </div>
  );
}
