"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Album } from "@/src/lib/memories";
import { createAlbum, deleteAlbum } from "@/src/app/actions/memories";

type Props = {
  albums: Album[];
  active: "all" | "none" | number;
  onSelect: (value: "all" | "none" | number) => void;
};

export function AlbumTabs({ albums, active, onSelect }: Props) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await createAlbum(name);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setName("");
    setCreating(false);
    router.refresh();
  }

  async function handleDelete(album: Album) {
    const confirmed = window.confirm(
      `¿Borrar la carpeta "${album.name}"? Las fotos no se borran, solo quedan sin carpeta.`,
    );
    if (!confirmed) return;

    await deleteAlbum(album.id);
    if (active === album.id) onSelect("all");
    router.refresh();
  }

  const tabClass = (isActive: boolean) =>
    `cursor-pointer rounded-full px-4 py-1.5 text-sm transition ${
      isActive
        ? "bg-rose-500 text-white"
        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
    }`;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onSelect("all")}
          className={tabClass(active === "all")}
        >
          Todos
        </button>
        <button
          type="button"
          onClick={() => onSelect("none")}
          className={tabClass(active === "none")}
        >
          Sin carpeta
        </button>

        {albums.map((album) => (
          <div key={album.id} className="group relative">
            <button
              type="button"
              onClick={() => onSelect(album.id)}
              className={tabClass(active === album.id)}
            >
              {album.name}
            </button>
            {/* Botoncito para borrar, solo aparece al pasar el mouse */}
            <button
              type="button"
              onClick={() => handleDelete(album)}
              className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full bg-stone-400 text-[10px] text-white group-hover:flex"
              aria-label={`Borrar carpeta ${album.name}`}
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="cursor-pointer rounded-full border border-dashed border-stone-300 px-4 py-1.5 text-sm text-stone-500 transition hover:bg-stone-100"
        >
          + Nueva carpeta
        </button>
      </div>

      {creating && (
        <form onSubmit={handleCreate} className="flex justify-center gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la carpeta"
            autoFocus
            className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-rose-500 px-4 py-1.5 text-sm text-white hover:bg-rose-600"
          >
            Crear
          </button>
        </form>
      )}
      {error && <p className="text-center text-sm text-rose-500">{error}</p>}
    </div>
  );
}
