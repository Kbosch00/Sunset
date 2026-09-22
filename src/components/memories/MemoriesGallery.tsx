"use client";

import Image from "next/image";
import { useState } from "react";
import type { Memory } from "@/src/lib/memories";
import { MemoryLightbox } from "./MemoryLightbox";

type Props = {
  items: Memory[];
};

export function MemoriesGallery({ items }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <p className="text-center text-stone-400">
        Aún no hay recuerdos por aquí.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-3/4 overflow-hidden rounded-2xl bg-stone-100 shadow-sm transition hover:shadow-md"
          >
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt="Recuerdo"
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <>
                <video
                  src={item.url}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
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
        ))}
      </div>

      {selectedIndex !== null && (
        <MemoryLightbox
          items={items}
          index={selectedIndex}
          onIndexChange={setSelectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
