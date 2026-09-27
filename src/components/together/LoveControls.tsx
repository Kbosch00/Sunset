"use client";

import { useState } from "react";
import Image from "next/image";
import { getPairingQrCode, sendCommand, stop } from "@/src/app/actions/lovense";
import { useToast } from "../Toast";
import { LiveIntensitySlider } from "./LiveIntensitySlider";
import { VibrationWave } from "./VibrationWave";

type Props = {
  connected: boolean;
};

export function LoveControls({ connected }: Props) {
  const { showToast } = useToast();
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loadingQr, setLoadingQr] = useState(false);
  const [liveStrength, setLiveStrength] = useState(0);

  async function handleConnect() {
    setLoadingQr(true);
    const result = await getPairingQrCode();
    setLoadingQr(false);

    if (!result.ok) {
      showToast(result.error, "error");
      return;
    }
    setQrImage(result.qrImage);
  }

  async function handleLiveChange(strength: number) {
    setLiveStrength(strength);
    const result = await sendCommand(strength, 0);
    if (!result.ok) {
      showToast(result.error, "error");
    }
  }

  async function handleStop() {
    setLiveStrength(0);
    await stop();
    showToast("Detenido");
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      <div className="rounded-2xl border border-stone-200/80 bg-white/50 p-4 text-center shadow-sm backdrop-blur-sm">
        {connected ? (
          <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs text-rose-600">
            Conectado
          </span>
        ) : (
          <button
            type="button"
            onClick={handleConnect}
            disabled={loadingQr}
            className="cursor-pointer rounded-full bg-stone-100 px-4 py-1.5 text-sm font-medium text-stone-600 transition hover:bg-stone-200 disabled:opacity-50"
          >
            {loadingQr ? "Generando..." : "Conectar el juguete de Ana"}
          </button>
        )}
      </div>
      {qrImage && (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-stone-200/80 bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm">
          <p className="text-sm text-stone-600">
            Amor, escanea esto con la app Lovense Remote
          </p>
          <p className="max-w-xs text-xs text-stone-400">
            Toma una captura de pantalla de este código y ábrela desde tu
            galería, tu cel lo va a reconocer sin la necesidad de la cámara.
          </p>
          <Image
            src={qrImage}
            alt="Código QR"
            width={200}
            height={200}
            unoptimized
          />
          <button
            type="button"
            onClick={() => setQrImage(null)}
            className="cursor-pointer text-xs text-stone-400 hover:text-stone-600"
          >
            Cerrar
          </button>
        </div>
      )}
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-stone-200/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
        <VibrationWave strength={liveStrength} />
        <p className="text-sm text-stone-500">Desliza para vibrar</p>
        <LiveIntensitySlider
          disabled={!connected}
          onChange={handleLiveChange}
          onRelease={handleLiveChange}
        />
        <button
          type="button"
          onClick={handleStop}
          disabled={!connected}
          className="w-full cursor-pointer rounded-full bg-stone-100 px-4 py-2.5 text-sm text-stone-500 transition hover:bg-stone-200 disabled:opacity-40"
        >
          Detener
        </button>
      </div>
    </div>
  );
}
