import { sayYes } from "../actions/ask";

export default function AskPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Pequeña introducción */}
        <p className="mb-6 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Una pregunta
        </p>

        {/* Título principal */}
        <h1 className="font-display text-4xl font-medium leading-tight text-stone-800 sm:text-5xl">
          ¿Quieres ser
          <br />
          <span className="text-rose-500">mi novia</span>?
        </h1>

        <div className="mt-10 flex flex-col items-center gap-4">
          <form action={sayYes}>
            <div className="flex gap-2">
              <button
                type="submit"
                className="group relative overflow-hidden rounded-full bg-rose-500 px-12 py-4 text-base font-medium tracking-wide text-white
                shadow-lg shadow-rose-200/50 transition-all duration-300 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-200/60 hover:scale-[1.02]
                active:scale-[0.98] cursor-pointer"
              >
                <span className="relative z-10">Sí</span>
              </button>
              <button
                type="button"
                className="
                group relative overflow-hidden rounded-full
                bg-rose-500 px-12 py-4
                text-base font-medium tracking-wide text-white
                shadow-lg shadow-rose-200/50
                transition-all duration-300
                hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-200/60
                hover:scale-[1.02]
                active:scale-[0.98]
                cursor-pointer hidden
              "
              >
                <span className="relative z-10">No</span>
              </button>
            </div>
          </form>

          <p className="text-xs text-stone-400">
            Tómate el tiempo que necesites
          </p>
        </div>
      </div>
    </main>
  );
}
