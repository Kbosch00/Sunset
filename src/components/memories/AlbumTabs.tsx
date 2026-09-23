"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Album } from "@/src/lib/memories";
import { useToast } from "../Toast";

import {
  createAlbum,
  deleteAlbum,
  updateAlbumName,
} from "@/src/app/actions/memories";

type Props = {
  albums: Album[];
  active: "all" | "none" | number;
  onSelect: (value: "all" | "none" | number) => void;
};

export function AlbumTabs({ albums, active, onSelect }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [managing, setManaging] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

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
    showToast("Carpeta creada 🌷");
  }

  async function handleDelete(album: Album) {
    const confirmed = window.confirm(
      `¿Borrar la carpeta "${album.name}"? Las fotos no se borran, solo quedan sin carpeta.`,
    );
    if (!confirmed) return;

    await deleteAlbum(album.id);
    if (active === album.id) onSelect("all");
    router.refresh();
    showToast(`Carpeta "${album.name}" eliminada`);
  }

  function startEditing(album: Album) {
    setEditingId(album.id);
    setEditingName(album.name);
  }

  async function handleRename(e: React.FormEvent) {
    e.preventDefault();
    if (editingId === null) return;

    const result = await updateAlbumName(editingId, editingName);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setEditingId(null);
    router.refresh();
    showToast("Carpeta renombrada");
  }

  const tabClass = (isActive: boolean) =>
    `cursor-pointer rounded-full px-4 py-1.5 text-sm transition ${
      isActive
        ? "bg-rose-500 text-white"
        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
    }`;

  if (managing) {
    return (
      <div className="mx-auto max-w-sm space-y-3 rounded-3xl border border-stone-200/80 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
        <p className="text-center text-sm font-medium text-stone-600">
          Gestionar carpetas
        </p>

        {albums.length === 0 && (
          <p className="text-center text-sm text-stone-400">
            Aún no has creado ninguna carpeta.
          </p>
        )}

        <div className="space-y-2">
          {albums.map((album) =>
            editingId === album.id ? (
              <form
                key={album.id}
                onSubmit={handleRename}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  autoFocus
                  className="flex-1 w-6 rounded-full border border-rose-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-200"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-rose-500 px-3 py-2 text-sm text-white hover:bg-rose-600"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="cursor-pointer rounded-full bg-stone-100 px-3 py-2 text-sm text-stone-500 hover:bg-stone-200"
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <div
                key={album.id}
                className="flex items-center justify-between gap-2 rounded-full bg-stone-50 px-4 py-2"
              >
                <span className="truncate text-sm text-stone-700">
                  {album.name}
                </span>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => startEditing(album)}
                    className="cursor-pointer rounded-full bg-stone-200 px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-300"
                  >
                    Renombrar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(album)}
                    className="cursor-pointer rounded-full bg-rose-50 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-100"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ),
          )}
        </div>

        {error && <p className="text-center text-sm text-rose-500">{error}</p>}

        <button
          type="button"
          onClick={() => setManaging(false)}
          className="w-full cursor-pointer rounded-full bg-rose-500 px-4 py-1.5 text-sm text-white hover:bg-rose-600"
        >
          Listo
        </button>
      </div>
    );
  }

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
          <button
            key={album.id}
            type="button"
            onClick={() => onSelect(album.id)}
            className={tabClass(active === album.id)}
          >
            {album.name}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="cursor-pointer rounded-full border border-dashed border-stone-300 px-4 py-1.5 text-sm text-stone-500 transition hover:bg-stone-100"
        >
          + Nueva carpeta
        </button>

        {albums.length > 0 && (
          <button
            type="button"
            onClick={() => setManaging(true)}
            className="cursor-pointer rounded-full border border-dashed border-stone-300 px-4 py-1.5 text-sm text-stone-500 transition hover:bg-stone-100"
          >
            Editar carpetas
          </button>
        )}
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
