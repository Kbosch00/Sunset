"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAccessCode } from "../actions/login";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showCode, setShowCode] = useState(false);
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
      setShake(true);
      window.setTimeout(() => setShake(false), 450);
      setLoading(false);
    }
  }

  return (
    <main className="fade-stagger relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="fade-enter w-full max-w-md text-center">
        <p className="fade-enter mb-5 text-sm tracking-[0.28em] text-stone-400 uppercase">
          Un lugar para nosotros
        </p>
        <h1 className="fade-enter font-display text-5xl font-medium tracking-wide text-stone-800 text-balance sm:text-6xl">
          Sunset
        </h1>
        <div className="fade-enter mx-auto mt-6 mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-rose-200" />
          <span className="size-1.5 rounded-full bg-rose-300" />
          <span className="h-px w-10 bg-rose-200" />
        </div>
        <p className="fade-enter text-pretty text-sm leading-relaxed text-stone-500 sm:text-base">
          Ingresa el nuestra fecha para continuar dd/mm/aaaa
        </p>
        <form
          onSubmit={handleSubmit}
          className={`fade-enter mt-10 rounded-4xl bg-white/60 p-7 shadow-login backdrop-blur-md sm:p-8 ${
            shake ? "login-shake" : ""
          }`}
        >
          <label
            htmlFor="access-code"
            className="mb-3 block text-xs tracking-[0.2em] uppercase text-stone-400"
          >
            Código
          </label>
          <div className="relative">
            <input
              id="access-code"
              type={showCode ? "text" : "password"}
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              maxLength={8}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError("");
              }}
              placeholder="········"
              className="w-full rounded-2xl border border-stone-200/80 bg-white/80 py-4 pl-4 pr-16 text-center text-xl tracking-[0.45em] text-stone-800 placeholder:tracking-[0.45em] placeholder:text-stone-300 transition focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200/70 disabled:opacity-60"
              autoFocus
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowCode((visible) => !visible)}
              className="absolute right-2 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-full px-2 text-[11px] tracking-wide text-stone-400 transition hover:text-stone-600"
              aria-label={showCode ? "Ocultar código" : "Mostrar código"}
            >
              {showCode ? "Ocultar" : "Ver"}
            </button>
          </div>

          {error ? (
            <p className="mt-4 text-center text-sm text-rose-500" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading || code.length === 0}
            className="mt-7 w-full cursor-pointer rounded-full bg-rose-500 px-8 py-4 text-base font-medium tracking-wide text-white shadow-lg shadow-rose-200/50 transition-all duration-300 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-200/60 hover:scale-[1.02] active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Verificando…" : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
