"use client";

import { useEffect, useRef, useState } from "react";
import type { Album } from "@/src/lib/memories";

type Props = {
  albums: Album[];
  // null = "Sin carpeta"
  value: number | null;
  onChange: (albumId: number | null) => void;
};

export function AlbumSelect({ albums, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLabel =
    value === null
      ? "Sin carpeta"
      : (albums.find((album) => album.id === value)?.name ?? "Sin carpeta");

  // Cierra el desplegable si haces clic en cualquier otro lado
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function select(albumId: number | null) {
    onChange(albumId);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        {currentLabel}
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        // Se abre hacia ARRIBA (bottom-full): este control vive cerca del
        // borde inferior del lightbox, y hacia abajo se saldría de pantalla
        <div className="absolute bottom-full left-1/2 z-10 mb-2 max-h-60 w-full -translate-x-1/2 overflow-y-auto rounded-2xl border border-stone-200/80 bg-white shadow-xl">
          <button
            type="button"
            onClick={() => select(null)}
            className={`block w-full cursor-pointer px-4 py-2.5 text-left text-sm transition hover:bg-rose-50 ${
              value === null ? "bg-rose-50 text-rose-600" : "text-stone-700"
            }`}
          >
            Sin carpeta
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              type="button"
              onClick={() => select(album.id)}
              className={`block w-full cursor-pointer px-4 py-2.5 text-left text-sm transition hover:bg-rose-50 ${
                value === album.id
                  ? "bg-rose-50 text-rose-600"
                  : "text-stone-700"
              }`}
            >
              {album.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
