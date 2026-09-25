"use server";

import { cookies, headers } from "next/headers";
import { db } from "@/src/prisma/db";

// Después de 5 intentos fallidos seguidos, bloqueamos por 15 minutos
const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

async function getClientIdentifier() {
  const headersList = await headers();
  // Vercel manda la IP real del visitante en este header
  const forwardedFor = headersList.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}

export async function verifyAccessCode(code: string) {
  const correctCode = process.env.ACCESS_CODE;
  if (!correctCode) {
    return { success: false, error: "Error de configuración" };
  }
  const identifier = await getClientIdentifier();
  const now = Date.now();
  const existing = await db.orm.public.LoginAttempt.where({
    identifier,
  }).first();

  if (existing?.lockedUntil && existing.lockedUntil > now) {
    const minutesLeft = Math.ceil((existing.lockedUntil - now) / 60000);
    return {
      success: false,
      error: `Demasiados intentos. Intenta de nuevo en ${minutesLeft} min.`,
    };
  }
  if (code.trim() !== correctCode) {
    const failedCount = (existing?.failedCount ?? 0) + 1;
    const lockedUntil =
      failedCount >= MAX_ATTEMPTS ? now + LOCK_MINUTES * 60000 : null;
    if (existing) {
      await db.orm.public.LoginAttempt.where({ identifier }).update({
        failedCount,
        lockedUntil,
      });
    } else {
      await db.orm.public.LoginAttempt.create({
        identifier,
        failedCount,
        lockedUntil,
      });
    }
    return { success: false, error: "Contraseña incorrecta :c" };
  }
  if (existing) {
    await db.orm.public.LoginAttempt.where({ identifier }).update({
      failedCount: 0,
      lockedUntil: null,
    });
  }
  const cookieStore = await cookies();
  cookieStore.set("sunset_access", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return { success: true };
}
