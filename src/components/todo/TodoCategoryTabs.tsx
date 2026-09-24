"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TodoCategory } from "@/src/lib/todos";
import {
  createTodoCategory,
  deleteTodoCategory,
  updateTodoCategoryName,
} from "@/src/app/actions/todos";
import { useToast } from "../Toast";

type Props = {
  categories: TodoCategory[];
  active: "all" | "none" | number;
  onSelect: (value: "all" | "none" | number) => void;
};

export function TodoCategoryTabs({ categories, active, onSelect }: Props) {
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

    const result = await createTodoCategory(name);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setName("");
    setCreating(false);
    router.refresh();
    showToast("Categoría creada 🌷");
  }

  async function handleDelete(category: TodoCategory) {
    const confirmed = window.confirm(
      `¿Borrar la categoría "${category.name}"? Las tareas no se borran, solo quedan sin categoría.`,
    );
    if (!confirmed) return;

    await deleteTodoCategory(category.id);
    if (active === category.id) onSelect("all");
    router.refresh();
    showToast(`Categoría "${category.name}" eliminada`);
  }

  function startEditing(category: TodoCategory) {
    setEditingId(category.id);
    setEditingName(category.name);
  }

  async function handleRename(e: React.FormEvent) {
    e.preventDefault();
    if (editingId === null) return;

    const result = await updateTodoCategoryName(editingId, editingName);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setEditingId(null);
    router.refresh();
    showToast("Categoría renombrada");
  }

  const tabClass = (isActive: boolean) =>
    `cursor-pointer rounded-full px-4 py-1.5 text-sm transition ${
      isActive
        ? "bg-rose-500 text-white"
        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
    }`;

  // --- Modo "gestionar categorías" (botones grandes, sin depender de hover) ---
  if (managing) {
    return (
      <div className="mx-auto max-w-sm space-y-3 rounded-3xl border border-stone-200/80 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
        <p className="text-center text-sm font-medium text-stone-600">
          Gestionar categorías
        </p>

        {categories.length === 0 && (
          <p className="text-center text-sm text-stone-400">
            Aún no has creado ninguna categoría.
          </p>
        )}

        <div className="space-y-2">
          {categories.map((category) =>
            editingId === category.id ? (
              <form
                key={category.id}
                onSubmit={handleRename}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  autoFocus
                  className="flex-1 rounded-full border border-rose-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-200"
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
                key={category.id}
                className="flex items-center justify-between gap-2 rounded-full bg-stone-50 px-4 py-2"
              >
                <span className="truncate text-sm text-stone-700">
                  {category.name}
                </span>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => startEditing(category)}
                    className="cursor-pointer rounded-full bg-stone-200 px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-300"
                  >
                    Renombrar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(category)}
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
          className="w-full cursor-pointer rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600 transition hover:bg-stone-200"
        >
          Listo
        </button>
      </div>
    );
  }

  // --- Modo normal: pestañas para filtrar ---
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onSelect("all")}
          className={tabClass(active === "all")}
        >
          Todas
        </button>
        <button
          type="button"
          onClick={() => onSelect("none")}
          className={tabClass(active === "none")}
        >
          Sin categoría
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={tabClass(active === category.id)}
          >
            {category.name}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="cursor-pointer rounded-full border border-dashed border-stone-300 px-4 py-1.5 text-sm text-stone-500 transition hover:bg-stone-100"
        >
          + Nueva categoría
        </button>

        {categories.length > 0 && (
          <button
            type="button"
            onClick={() => setManaging(true)}
            className="cursor-pointer rounded-full border border-dashed border-stone-300 px-4 py-1.5 text-sm text-stone-500 transition hover:bg-stone-100"
          >
            Editar categorías
          </button>
        )}
      </div>

      {creating && (
        <form onSubmit={handleCreate} className="flex justify-center gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la categoría"
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
