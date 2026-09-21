"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function sayYes() {
  const cookieStore = await cookies();

  cookieStore.set("sunset_said_yes", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 año
    path: "/",
  });

  redirect("/");
}
