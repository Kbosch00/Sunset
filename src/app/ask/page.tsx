import { sayYes } from "../actions/ask";

export default function AskPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="fade-stagger w-full max-w-lg text-center">
        <p className="fade-enter mb-5 text-sm tracking-[0.28em] text-stone-400 uppercase">
          Para Ana, mi pedacito de cielo
        </p>
        <h1 className="fade-enter font-display text-4xl font-medium leading-tight text-stone-800 text-balance sm:text-5xl">
          ¿Quieres ser
          <br />
          <span className="text-rose-500">mi novia</span>?
        </h1>
        <div className="fade-enter mx-auto mt-6 mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-rose-200" />
          <span className="size-1.5 rounded-full bg-rose-300" />
          <span className="h-px w-10 bg-rose-200" />
        </div>
        <div className="fade-enter mt-12 flex flex-col items-center gap-5">
          <form action={sayYes}>
            <button
              type="submit"
              className="
                rounded-full bg-rose-500 px-14 py-4
                text-base font-medium tracking-wide text-white
                shadow-lg shadow-rose-200/50
                transition-all duration-300
                hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-200/60
                hover:scale-[1.02]
                active:scale-[0.96] 
                cursor-pointer
              "
            >
              Sí
            </button>
          </form>
          <p className="text-xs tracking-wide text-stone-400">
            Tómate el tiempo que necesites
          </p>
        </div>
      </div>
    </main>
  );
}
