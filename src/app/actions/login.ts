"use server";

import { cookies } from "next/headers";

export async function verifyAccessCode(code: string) {
  const correctCode = process.env.ACCESS_CODE;

  if (!correctCode) {
    return { success: false, error: "Error de configuración" };
  }

  if (code.trim() !== correctCode) {
    return { success: false, error: "Contraseña incorrecta :c" };
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
