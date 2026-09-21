"use client";

import { useState } from "react";
import { createWriting, updateWriting } from "@/src/app/actions/writings";
import type { Author, Writing } from "@/src/lib/writings";

type Props = {
  mode: "create" | "edit";
  initialWriting?: Writing;
  onDone: () => void;
  onCancel: () => void;
};

export function WritingForm({ mode, initialWriting, onDone, onCancel }: Props) {
  const [author, setAuthor] = useState<Author>(initialWriting?.author ?? "Kev");
  const [title, setTitle] = useState(initialWriting?.title ?? "");
  const [content, setContent] = useState(initialWriting?.content ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result =
      mode === "create"
        ? await createWriting(author, title, content)
        : await updateWriting(initialWriting!.id, title, content);

    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    onDone();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-stone-200/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm sm:p-8"
    >
      <span className="text-stone-500">¿Quien escribe?</span>
      {mode === "create" && (
        <div className="flex gap-2">
          {(["Kev", "Ana"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setAuthor(option)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm transition ${
                author === option
                  ? "bg-rose-500 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {option === "Kev" ? "Kev" : "Ana"}
            </button>
          ))}
        </div>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-200"
        disabled={loading}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe aquí..."
        rows={6}
        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-200"
        disabled={loading}
      />

      {error && <p className="text-sm text-rose-500">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-full bg-rose-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-rose-600 disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : mode === "create"
              ? "Publicar"
              : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="cursor-pointer rounded-full bg-stone-100 px-6 py-2 text-sm text-stone-600 transition hover:bg-stone-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
