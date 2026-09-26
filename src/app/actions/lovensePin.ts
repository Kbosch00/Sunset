"use server";

import { cookies } from "next/headers";

// 1 hora exacta, sin importar si el navegador sigue "abierto"
const COOKIE_MAX_AGE = 60 * 60;

export async function verifyLovensePin(pin: string) {
  const correctPin = process.env.LOVENSE_PIN;

  if (!correctPin) {
    return { success: false, error: "Error de configuración" };
  }

  if (pin.trim() !== correctPin) {
    return { success: false, error: "PIN incorrecto" };
  }

  const cookieStore = await cookies();

  cookieStore.set("sunset_lovense_access", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return { success: true };
}
