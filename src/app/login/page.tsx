"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAccessCode } from "../actions/login";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await verifyAccessCode(code);

    if (result.success) {
      router.push("/");
      router.refresh();
    } else {
      setError(result.error || "Código incorrecto");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50 flex-1 px-4 pb-28 pt-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light tracking-wide text-stone-800">
            Sunset
          </h1>
          <p className="mt-2 text-stone-500 text-sm">
            Ingresa el código para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition"
              autoFocus
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-center text-sm text-rose-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || code.length === 0}
            className="w-full py-3 rounded-xl bg-stone-800 text-white font-medium hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
