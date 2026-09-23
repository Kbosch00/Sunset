"use client";

import { useMemo, useState } from "react";
import type { Album, Memory } from "@/src/lib/memories";
import { AlbumTabs } from "./AlbumTabs";
import { MemoryUploader } from "./MemoryUploader";
import { MemoriesGallery } from "./MemoriesGallery";
import { MemoryLightbox } from "./MemoryLightbox";
import { Pagination } from "../Pagination";

type Props = {
  items: Memory[];
  albums: Album[];
};

const MEMORIES_PER_PAGE = 9;

export function MemoriesView({ items, albums }: Props) {
  const [active, setActive] = useState<"all" | "none" | number>("all");
  const [page, setPage] = useState(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleSelect(value: "all" | "none" | number) {
    setActive(value);
    setPage(1);
    setOpenIndex(null);
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
  const startIndex = (currentPage - 1) * MEMORIES_PER_PAGE;
  const paginated = useMemo(
    () => filtered.slice(startIndex, startIndex + MEMORIES_PER_PAGE),
    [filtered, startIndex],
  );

  const uploadAlbumId = typeof active === "number" ? active : null;

  function handleIndexChange(newIndex: number) {
    setOpenIndex(newIndex);
    setPage(Math.floor(newIndex / MEMORIES_PER_PAGE) + 1);
  }

  return (
    <div className="space-y-6">
      <AlbumTabs albums={albums} active={active} onSelect={handleSelect} />

      <div className="flex justify-center">
        <MemoryUploader albumId={uploadAlbumId} />
      </div>

      <MemoriesGallery
        items={paginated}
        startIndex={startIndex}
        onOpen={setOpenIndex}
      />

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={setPage}
      />
      {openIndex !== null && (
        <MemoryLightbox
          items={filtered}
          index={openIndex}
          onIndexChange={handleIndexChange}
          onClose={() => setOpenIndex(null)}
          albums={albums}
        />
      )}
    </div>
  );
}
