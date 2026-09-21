"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { MemoryItem } from "@/src/lib/memories";

type Props = {
  item: MemoryItem;
  onClose: () => void;
};

export function MemoryLightbox({ item, onClose }: Props) {
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
        className="relative max-h-[90vh] max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt="Recuerdo"
            width={1600}
            height={1200}
            className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
            priority
          />
        ) : (
          <video
            src={item.src}
            controls
            autoPlay
            playsInline
            className="mx-auto max-h-[85vh] w-full rounded-2xl bg-black shadow-2xl"
          />
        )}
      </div>
    </div>
  );
}
