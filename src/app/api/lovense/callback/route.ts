import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function POST(request: Request) {
  const body = await request.json();

  const existing = await db.orm.public.LoveDevice.where({
    label: "Ana",
  }).first();

  if (existing) {
    await db.orm.public.LoveDevice.where({ label: "Ana" }).update({
      uid: body.uid,
      utoken: body.utoken,
    });
  } else {
    await db.orm.public.LoveDevice.create({
      label: "Ana",
      uid: body.uid,
      utoken: body.utoken,
    });
  }

  return NextResponse.json({ result: true });
}
