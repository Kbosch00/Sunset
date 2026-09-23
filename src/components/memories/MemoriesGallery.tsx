"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Memory } from "@/src/lib/memories";

type Props = {
  items: Memory[];
  startIndex: number;
  onOpen: (absoluteIndex: number) => void;
};

function MemoryThumbnail({
  item,
  onOpen,
}: {
  item: Memory;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
    // readyState >= 2 significa "ya tiene al menos el primer cuadro listo"
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setLoaded(true);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-3/4 overflow-hidden rounded-2xl bg-stone-100 shadow-sm transition hover:shadow-md"
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-stone-200" />
      )}

      {item.type === "image" ? (
        <Image
          ref={imgRef}
          src={item.url}
          alt="Recuerdo"
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <>
          <video
            ref={videoRef}
            src={item.url}
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
            className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 translate-x-0.5"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </button>
  );
}

export function MemoriesGallery({ items, startIndex, onOpen }: Props) {
  if (items.length === 0) {
    return (
      <p className="text-center text-stone-400">
        Aún no hay recuerdos por aquí.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {items.map((item, i) => (
        <MemoryThumbnail
          key={item.id}
          item={item}
          onOpen={() => onOpen(startIndex + i)}
        />
      ))}
    </div>
  );
}
