"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyLovensePin } from "@/src/app/actions/lovensePin";

export default function LovensePinPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await verifyLovensePin(pin);
    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "PIN incorrecto");
      return;
    }

    router.push("/together");
    router.refresh();
  }

  return (
    <main className="fade-stagger flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="fade-enter mb-4 text-sm tracking-[0.2em] text-stone-400 uppercase">
        Acceso especial
      </p>
      <h1 className="fade-enter font-display text-2xl font-medium text-stone-800 sm:text-3xl">
        Ingresa el PIN
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex w-full max-w-xs flex-col items-center gap-3"
      >
        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          autoFocus
          className="w-full rounded-full border border-stone-200 bg-white px-4 py-2.5 text-center text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-200"
        />

        {error && <p className="text-sm text-rose-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-rose-600 disabled:opacity-50"
        >
          {loading ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
