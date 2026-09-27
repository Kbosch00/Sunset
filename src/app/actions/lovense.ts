"use server";

import { db } from "@/src/prisma/db";

const DEV_TOKEN = process.env.LOVENSE_DEVELOPER_TOKEN;

export async function getPairingQrCode() {
  if (!DEV_TOKEN) {
    return {
      ok: false as const,
      error: "Falta configurar LOVENSE_DEVELOPER_TOKEN",
    };
  }

  let response: Response;
  try {
    response = await fetch("https://api.lovense.com/api/lan/getQrCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: DEV_TOKEN,
        uid: "sunset-ana",
        uname: "Ana",
      }),
    });
  } catch (err) {
    console.log("La petición ni siquiera llegó a Lovense:", err);
    return { ok: false as const, error: "No se pudo conectar con Lovense" };
  }

  const rawText = await response.text();

  let data: { code?: number; data?: { qr?: string }; message?: string };
  try {
    data = JSON.parse(rawText);
  } catch {
    return { ok: false as const, error: "Lovense no devolvió JSON válido" };
  }

  if (data.code !== 0 && data.code !== 200) {
    return { ok: false as const, error: "No se pudo generar el código QR" };
  }

  return { ok: true as const, qrImage: data.data?.qr ?? data.message ?? "" };
}

export async function getConnectedDevice() {
  const device = await db.orm.public.LoveDevice.where({ label: "Ana" }).first();
  return device ?? null;
}

export async function sendCommand(strength: number, seconds: number) {
  if (!DEV_TOKEN) {
    return {
      ok: false as const,
      error: "Falta configurar LOVENSE_DEVELOPER_TOKEN",
    };
  }

  const device = await db.orm.public.LoveDevice.where({ label: "Ana" }).first();

  if (!device) {
    return { ok: false as const, error: "Ana no tiene un juguete conectado" };
  }

  const response = await fetch("https://api.lovense.com/api/lan/v2/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: DEV_TOKEN,
      uid: device.uid,
      command: "Function",
      action: `Vibrate:${strength}`,
      timeSec: seconds,
      apiVer: 1,
    }),
  });

  const data = await response.json();
  if (data.code !== 200 && data.code !== 0) {
    return { ok: false as const, error: "El comando no se pudo enviar" };
  }

  return { ok: true as const };
}

export async function stop() {
  return sendCommand(0, 0);
}
