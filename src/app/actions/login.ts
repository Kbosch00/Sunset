"use server";

import { cookies } from "next/headers";

export async function verifyAccessCode(code: string) {
  const correctCode = process.env.ACCESS_CODE;

  if (!correctCode) {
    return { success: false, error: "Error de configuración" };
  }

  if (code.trim() !== correctCode) {
    return { success: false, error: "Código incorrecto" };
  }

  const cookieStore = await cookies();

  // Cookie de acceso SOLO de sesión (se borra al cerrar el navegador)
  cookieStore.set("sunset_access", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // ← sin maxAge = cookie de sesión
  });

  return { success: true };
}
