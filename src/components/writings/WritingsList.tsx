"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Writing } from "@/src/lib/writings";
import { deleteWriting } from "@/src/app/actions/writings";
import { WritingCard } from "./WritingCard";
import { WritingLightbox } from "./WritingLightbox";
import { WritingForm } from "./WritingForm";
import { ConfirmDialog } from "../ConfirmDialog";
import { Pagination } from "../Pagination";
import { useToast } from "../Toast";

type Props = {
  writings: Writing[];
};

export function WritingsList({ writings }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const WRITINGS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(writings.length / WRITINGS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedWritings = useMemo(() => {
    const start = (currentPage - 1) * WRITINGS_PER_PAGE;
    return writings.slice(start, start + WRITINGS_PER_PAGE);
  }, [currentPage, writings]);
  const [selected, setSelected] = useState<Writing | null>(null);
  const [formMode, setFormMode] = useState<"none" | "create" | "edit">("none");
  const [editingWriting, setEditingWriting] = useState<Writing | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Writing | null>(null);

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
  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeletingId(pendingDelete.id);
    await deleteWriting(pendingDelete.id);
    setDeletingId(null);
    setPendingDelete(null);
    setSelected(null);
    router.refresh();
    showToast("Escrito eliminado");
  }

  return (
    <>
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
              const wasEditing = formMode === "edit";
              closeForm();
              router.refresh();
              showToast(
                wasEditing ? "Escrito actualizado" : "Escrito publicado 🌷",
              );
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
            {paginatedWritings.map((writing) => (
              <WritingCard
                key={writing.id}
                writing={writing}
                onOpen={() => setSelected(writing)}
              />
            ))}
          </div>
        )}
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setPage}
        />

        {selected && (
          <WritingLightbox
            writing={selected}
            onClose={() => setSelected(null)}
            onEdit={() => openEditForm(selected)}
            onDelete={() => setPendingDelete(selected)}
            deleting={deletingId === selected.id}
          />
        )}
      </div>
      <ConfirmDialog
        open={pendingDelete !== null}
        title={pendingDelete ? `¿Borrar "${pendingDelete.title}"?` : ""}
        description="No se puede deshacer."
        loading={deletingId !== null}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
