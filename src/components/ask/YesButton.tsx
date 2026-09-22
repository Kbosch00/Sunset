"use client";

import { useState } from "react";
import { sayYes } from "@/src/app/actions/ask";

export function YesButton() {
  const [celebrating, setCelebrating] = useState(false);

  async function handleYes() {
    setCelebrating(true);
    await new Promise((r) => setTimeout(r, 1600));
    await sayYes();
  }

  return (
    <>
      <button
        type="button"
        onClick={handleYes}
        disabled={celebrating}
        className="
          rounded-full bg-rose-500 px-14 py-4
          text-base font-medium tracking-wide text-white
          shadow-lg shadow-rose-200/50
          transition-all duration-300
          hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-200/60
          hover:scale-[1.02]
          active:scale-[0.96]
          disabled:opacity-80
        "
      >
        {celebrating ? "…" : "Sí"}
      </button>

      {celebrating && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center rounded-2xl">
          <div className="absolute inset-0 bg-rose-50 backdrop-blur-sm" />
          <div className="relative text-center">
            <p className="font-display text-4xl text-rose-500 sm:text-5xl animate-pulse">
              ♥
            </p>
            <p className="mt-4 font-display text-2xl text-rose-500 font-bold">
              Te amo
            </p>
          </div>
          <span className="yes-petal absolute left-[20%] top-[30%] text-2xl text-rose-400">
            🌸
          </span>
          <span
            className="yes-petal absolute right-[25%] top-[40%] text-xl text-rose-300"
            style={{ animationDelay: "0.2s" }}
          >
            🌸
          </span>
          <span
            className="yes-petal absolute left-[40%] top-[20%] text-lg text-rose-400"
            style={{ animationDelay: "0.4s" }}
          >
            ✨
          </span>
          <span
            className="yes-petal absolute right-[35%] top-[55%] text-2xl text-rose-300"
            style={{ animationDelay: "0.1s" }}
          >
            🌸
          </span>
        </div>
      )}
    </>
  );
}
