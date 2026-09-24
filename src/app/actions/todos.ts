"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import type { Todo, TodoCategory } from "@/src/lib/todos";

export async function getTodos(): Promise<Todo[]> {
  const rows = await db.orm.public.Todo.where({})
    .orderBy((t) => t.createdAt.asc())
    .all();
  return rows as Todo[];
}

export async function createTodo(content: string, categoryId: number | null) {
  const trimmed = content.trim();

  if (!trimmed) {
    return { ok: false as const, error: "Escribe algo para la lista" };
  }

  const todo = await db.orm.public.Todo.create({
    content: trimmed,
    done: false,
    categoryId,
  });

  revalidatePath("/todo");
  return { ok: true as const, todo };
}

export async function toggleTodo(id: number, done: boolean) {
  await db.orm.public.Todo.where({ id }).update({ done });
  revalidatePath("/todo");
  return { ok: true as const };
}

export async function deleteTodo(id: number) {
  await db.orm.public.Todo.where({ id }).delete();
  revalidatePath("/todo");
  return { ok: true as const };
}

export async function getTodoCategories(): Promise<TodoCategory[]> {
  const rows = await db.orm.public.TodoCategory.where({})
    .orderBy((c) => c.createdAt.desc())
    .all();
  return rows as TodoCategory[];
}

export async function createTodoCategory(name: string) {
  const trimmed = name.trim();

  if (!trimmed) {
    return { ok: false as const, error: "Ponle un nombre a la categoría" };
  }

  const category = await db.orm.public.TodoCategory.create({ name: trimmed });
  revalidatePath("/todo");
  return { ok: true as const, category };
}

export async function updateTodoCategoryName(id: number, name: string) {
  const trimmed = name.trim();

  if (!trimmed) {
    return { ok: false as const, error: "Ponle un nombre a la categoría" };
  }

  await db.orm.public.TodoCategory.where({ id }).update({ name: trimmed });
  revalidatePath("/todo");
  return { ok: true as const };
}

export async function deleteTodoCategory(id: number) {
  await db.orm.public.Todo.where({ categoryId: id }).updateAll({
    categoryId: null,
  });
  await db.orm.public.TodoCategory.where({ id }).delete();

  revalidatePath("/todo");
  return { ok: true as const };
}
