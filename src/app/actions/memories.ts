"use server";

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";
import type { Album, Memory } from "@/src/lib/memories";

export async function getMemories(): Promise<Memory[]> {
  const rows = await db.orm.public.Memory.where({})
    .orderBy((m) => m.createdAt.desc())
    .all();
  return rows as Memory[];
}

export async function deleteMemory(id: number) {
  await db.orm.public.Memory.where({ id }).delete();
  revalidatePath("/memories");
  return { ok: true as const };
}

export async function getAlbums(): Promise<Album[]> {
  const rows = await db.orm.public.Album.where({})
    .orderBy((a) => a.createdAt.desc())
    .all();
  return rows as Album[];
}

export async function createAlbum(name: string) {
  const trimmed = name.trim();

  if (!trimmed) {
    return { ok: false as const, error: "Ponle un nombre a la carpeta" };
  }

  const album = await db.orm.public.Album.create({ name: trimmed });
  revalidatePath("/memories");
  return { ok: true as const, album };
}

export async function deleteAlbum(id: number) {
  // Las fotos de esta carpeta NO se borran, solo quedan "sin carpeta"
  await db.orm.public.Memory.where({ albumId: id }).updateAll({
    albumId: null,
  });
  await db.orm.public.Album.where({ id }).delete();

  revalidatePath("/memories");
  return { ok: true as const };
}
