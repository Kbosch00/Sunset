"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/src/prisma/db";

const MAX_COOKIE_AGE = 60 * 60 * 24 * 400;

export async function sayYes() {
  const existing = await db.orm.public.Proposal.where({}).first();
  if (!existing) {
    await db.orm.public.Proposal.create({});
  }

  const cookieStore = await cookies();

  cookieStore.set("sunset_said_yes", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_COOKIE_AGE,
    path: "/",
  });

  redirect("/");
}
