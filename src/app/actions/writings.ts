"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import type { Author, Writing } from "@/src/lib/writings";

export async function getWritings(): Promise<Writing[]> {
  const rows = await db.orm.public.Writing.where({})
    .orderBy((w) => w.createdAt.desc())
    .all();
  return rows as Writing[];
}

export async function createWriting(
  author: Author,
  title: string,
  content: string,
) {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  if (!trimmedTitle || !trimmedContent) {
    return {
      ok: false as const,
      error: "Se necesita un título y contenido",
    };
  }

  const writing = await db.orm.public.Writing.create({
    author,
    title: trimmedTitle,
    content: trimmedContent,
  });
  revalidatePath("/writings");
  return { ok: true as const, writing };
}

export async function updateWriting(
  id: number,
  title: string,
  content: string,
) {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  if (!trimmedTitle || !trimmedContent) {
    return {
      ok: false as const,
      error: "Se necesita un título y contenido",
    };
  }

  const writing = await db.orm.public.Writing.where({ id }).update({
    title: trimmedTitle,
    content: trimmedContent,
  });

  revalidatePath("/writings");
  return { ok: true as const, writing };
}

export async function deleteWriting(id: number) {
  await db.orm.public.Writing.where({ id }).delete();
  revalidatePath("/writings");
  return { ok: true as const };
}
