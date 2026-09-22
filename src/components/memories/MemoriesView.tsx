"use client";

import { useMemo, useState } from "react";
import type { Album, Memory } from "@/src/lib/memories";
import { AlbumTabs } from "./AlbumTabs";
import { MemoryUploader } from "./MemoryUploader";
import { MemoriesGallery } from "./MemoriesGallery";

type Props = {
  items: Memory[];
  albums: Album[];
};

const MEMORIES_PER_PAGE = 9;

export function MemoriesView({ items, albums }: Props) {
  const [active, setActive] = useState<"all" | "none" | number>("all");
  const [page, setPage] = useState(1);

  function handleSelect(value: "all" | "none" | number) {
    setActive(value);
    setPage(1); // al cambiar de carpeta, volvemos a la página 1
  }

  const filtered = useMemo(() => {
    if (active === "all") return items;
    if (active === "none") return items.filter((item) => item.albumId === null);
    return items.filter((item) => item.albumId === active);
  }, [items, active]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / MEMORIES_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * MEMORIES_PER_PAGE;
    return filtered.slice(start, start + MEMORIES_PER_PAGE);
  }, [filtered, currentPage]);

  const uploadAlbumId = typeof active === "number" ? active : null;

  return (
    <div className="space-y-6">
      <AlbumTabs albums={albums} active={active} onSelect={handleSelect} />

      <div className="flex justify-center">
        <MemoryUploader albumId={uploadAlbumId} />
      </div>

      <MemoriesGallery items={paginated} />

      {filtered.length > MEMORIES_PER_PAGE && (
        <nav
          className="flex items-center justify-center gap-4 pt-2"
          aria-label="Paginación de recuerdos"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600 transition hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-sm text-stone-500">
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600 transition hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </nav>
      )}
    </div>
  );
}
