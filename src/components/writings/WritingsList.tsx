"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Writing } from "@/src/lib/writings";
import { deleteWriting } from "@/src/app/actions/writings";
import { WritingCard } from "./WritingCard";
import { WritingLightbox } from "./WritingLightbox";
import { WritingForm } from "./WritingForm";

type Props = {
  writings: Writing[];
};

export function WritingsList({ writings }: Props) {
  const router = useRouter();

  // Cuál escrito está abierto en el lightbox (o null si ninguno)
  const [selected, setSelected] = useState<Writing | null>(null);

  // Qué formulario mostrar arriba de la lista: nada, "crear" o "editar"
  const [formMode, setFormMode] = useState<"none" | "create" | "edit">("none");
  const [editingWriting, setEditingWriting] = useState<Writing | null>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  function openCreateForm() {
    setSelected(null);
    setEditingWriting(null);
    setFormMode("create");
  }

  function openEditForm(writing: Writing) {
    setSelected(null);
    setEditingWriting(writing);
    setFormMode("edit");
  }

  function closeForm() {
    setFormMode("none");
    setEditingWriting(null);
  }

  async function handleDelete(writing: Writing) {
    const confirmed = window.confirm(
      `¿Borrar "${writing.title}"? No se puede deshacer.`,
    );
    if (!confirmed) return;

    setDeletingId(writing.id);
    await deleteWriting(writing.id);
    setDeletingId(null);
    setSelected(null);
    router.refresh(); // vuelve a pedir la lista al servidor, ya sin ese escrito
  }

  return (
    <div className="space-y-6">
      {formMode === "none" && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={openCreateForm}
            className="cursor-pointer rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-rose-600"
          >
            + Nuevo escrito
          </button>
        </div>
      )}

      {formMode !== "none" && (
        <WritingForm
          mode={formMode}
          initialWriting={editingWriting ?? undefined}
          onDone={() => {
            closeForm();
            router.refresh();
          }}
          onCancel={closeForm}
        />
      )}

      {writings.length === 0 ? (
        <p className="text-center text-stone-400">
          Aún no hay escritos por aquí.
        </p>
      ) : (
        <div className="space-y-6">
          {writings.map((writing) => (
            <WritingCard
              key={writing.id}
              writing={writing}
              onOpen={() => setSelected(writing)}
            />
          ))}
        </div>
      )}

      {selected && (
        <WritingLightbox
          writing={selected}
          onClose={() => setSelected(null)}
          onEdit={() => openEditForm(selected)}
          onDelete={() => handleDelete(selected)}
          deleting={deletingId === selected.id}
        />
      )}
    </div>
  );
}
