"use client";

import { useState } from "react";
import type { Writing } from "@/src/lib/writings";
import { WritingCard } from "./WritingCard";
import { WritingLightbox } from "./WritingLightbox";

type Props = {
  writings: Writing[];
};

export function WritingsList({ writings }: Props) {
  // Igual que en MemoriesGallery: guardamos aquí cuál escrito está
  // seleccionado. Si es null, no se muestra ningún lightbox.
  const [selected, setSelected] = useState<Writing | null>(null);

  if (writings.length === 0) {
    return (
      <p className="text-center text-stone-400">
        Aún no hay escritos por aquí.
      </p>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {writings.map((writing) => (
          <WritingCard
            key={writing.id}
            writing={writing}
            onOpen={() => setSelected(writing)}
          />
        ))}
      </div>

      {selected && (
        <WritingLightbox writing={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
