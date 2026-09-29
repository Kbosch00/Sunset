"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { Album, Memory } from "@/src/lib/memories";
import { ConfirmDialog } from "../ConfirmDialog";
import { useToast } from "../Toast";
import { AlbumSelect } from "./AlbumSelect";
import { deleteMemory, updateMemoryAlbum } from "@/src/app/actions/memories";

type Props = {
  items: Memory[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  albums: Album[];
};

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function MemoryLightbox({
  items,
  index,
  onIndexChange,
  onClose,
  albums,
}: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const [deleting, setDeleting] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const item = items[index];
  const isClient = useIsClient();
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function goPrev() {
    if (hasPrev) onIndexChange(index - 1);
  }

  function goNext() {
    if (hasNext) onIndexChange(index + 1);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) goPrev();
    else goNext();
  }

  async function handleAlbumChange(newAlbumId: number | null) {
    await updateMemoryAlbum(item.id, newAlbumId);
    router.refresh();
    const albumName = albums.find((a) => a.id === newAlbumId)?.name;
    showToast(albumName ? `Movido a "${albumName}"` : "Movido a Sin carpeta");
  }

  if (!item || !isClient) return null;

  const content = (
    <div
      className="fixed inset-0 z-100 overflow-y-auto bg-stone-900/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="sticky top-0 z-10 flex items-center justify-between gap-2 bg-linear-to-b from-stone-900/90 to-transparent px-4 pb-10 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          disabled={deleting}
          className="rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20 disabled:opacity-50"
        >
          {deleting ? "Borrando..." : "Eliminar"}
        </button>

        <div className="flex items-center gap-2">
          {hasPrev && (
            <button
              type="button"
              onClick={goPrev}
              className="rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              aria-label="Anterior"
            >
              ‹
            </button>
          )}
          {hasNext && (
            <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              aria-label="Siguiente"
            >
              ›
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
          >
            Cerrar
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="¿Borrar este recuerdo?"
        description="No se puede deshacer."
        loading={deleting}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          setDeleting(true);
          await deleteMemory(item.id);
          setDeleting(false);
          setConfirmOpen(false);
          onClose();
          router.refresh();
          showToast("Recuerdo eliminado");
        }}
      />

      <div className="flex justify-center px-4 pb-6" onClick={onClose}>
        <div
          className="relative w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {item.type === "image" ? (
            <Image
              key={item.id}
              src={item.url}
              alt="Recuerdo"
              width={1600}
              height={1200}
              className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
              priority
            />
          ) : (
            <video
              key={item.id}
              src={item.url}
              controls
              autoPlay
              playsInline
              className="mx-auto max-h-[85vh] w-full rounded-2xl bg-black shadow-2xl"
            />
          )}

          <div className="mt-3 flex flex-col items-center gap-3">
            <p className="text-center text-xs text-white/60">
              {index + 1} / {items.length}
            </p>

            <AlbumSelect
              albums={albums}
              value={item.albumId}
              onChange={handleAlbumChange}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
