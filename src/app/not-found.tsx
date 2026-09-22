import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm tracking-[0.2em] text-stone-400 uppercase">
        404
      </p>
      <h1 className="font-display text-3xl font-medium text-stone-800 sm:text-4xl">
        Por aquí no hay nada
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-sm text-stone-500 sm:text-base">
        Parece que te perdiste. Volvamos a donde sí hay algo bonito.
      </p>
      <Link
        href="/"
        className="mt-8 cursor-pointer rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-600"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
