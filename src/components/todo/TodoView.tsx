"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Todo, TodoCategory } from "@/src/lib/todos";
import { createTodo, deleteTodo, toggleTodo } from "@/src/app/actions/todos";
import { useToast } from "../Toast";
import { Pagination } from "../Pagination";
import { TodoCategoryTabs } from "./TodoCategoryTabs";

type Props = {
  items: Todo[];
  categories: TodoCategory[];
};

const TODOS_PER_PAGE = 10;

export function TodoView({ items, categories }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<"all" | "none" | number>("all");
  const [page, setPage] = useState(1);

  function handleSelect(value: "all" | "none" | number) {
    setActive(value);
    setPage(1);
  }

  const filtered = useMemo(() => {
    if (active === "all") return items;
    if (active === "none") return items.filter((t) => t.categoryId === null);
    return items.filter((t) => t.categoryId === active);
  }, [items, active]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / TODOS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * TODOS_PER_PAGE;
    return filtered.slice(start, start + TODOS_PER_PAGE);
  }, [filtered, currentPage]);

  const pending = useMemo(() => paginated.filter((t) => !t.done), [paginated]);
  const done = useMemo(
    () =>
      [...paginated.filter((t) => t.done)].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    [paginated],
  );

  const newTodoCategoryId = typeof active === "number" ? active : null;

  function setPending(id: number, isPending: boolean) {
    setPendingIds((current) => {
      const next = new Set(current);
      if (isPending) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await createTodo(text, newTodoCategoryId);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setText("");
    router.refresh();
    showToast("Agregado a la lista 🌷");
  }

  async function handleToggle(todo: Todo) {
    setPending(todo.id, true);
    await toggleTodo(todo.id, !todo.done);
    setPending(todo.id, false);
    router.refresh();
  }

  async function handleDelete(todo: Todo) {
    setPending(todo.id, true);
    await deleteTodo(todo.id);
    router.refresh();
    showToast("Eliminado de la lista");
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <TodoCategoryTabs
        categories={categories}
        active={active}
        onSelect={handleSelect}
      />

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Algo por hacer..."
          className="min-w-0 flex-1 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-200"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-rose-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-rose-600"
        >
          Agregar
        </button>
      </form>
      {error && <p className="text-sm text-rose-500">{error}</p>}

      {filtered.length === 0 ? (
        <p className="text-center text-stone-400">
          No hay nada aún, agreguemos cosas.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            {pending.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                disabled={pendingIds.has(todo.id)}
                onToggle={() => handleToggle(todo)}
                onDelete={() => handleDelete(todo)}
              />
            ))}
          </div>

          {done.length > 0 && (
            <div className="space-y-2 border-t border-stone-200 pt-4">
              <p className="px-1 text-xs tracking-wide text-stone-400 uppercase">
                Hechas
              </p>
              {done.map((todo) => (
                <TodoRow
                  key={todo.id}
                  todo={todo}
                  disabled={pendingIds.has(todo.id)}
                  onToggle={() => handleToggle(todo)}
                  onDelete={() => handleDelete(todo)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}

function TodoRow({
  todo,
  disabled,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  disabled: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white/50 px-4 py-3 shadow-sm backdrop-blur-sm">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-label={todo.done ? "Marcar como pendiente" : "Marcar como hecho"}
        className={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition disabled:opacity-50 ${
          todo.done
            ? "border-rose-500 bg-rose-500 text-white"
            : "border-stone-300 hover:border-rose-400"
        }`}
      >
        {todo.done && (
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <p
        className={`min-w-0 flex-1 wrap-break-word text-sm transition ${
          todo.done ? "text-stone-400 line-through" : "text-stone-700"
        }`}
      >
        {todo.content}
      </p>

      <button
        type="button"
        onClick={onDelete}
        disabled={disabled}
        aria-label="Eliminar"
        className="shrink-0 cursor-pointer rounded-full px-2 py-1 text-xs text-stone-300 transition hover:bg-rose-50 hover:text-rose-500 disabled:opacity-50"
      >
        ×
      </button>
    </div>
  );
}
