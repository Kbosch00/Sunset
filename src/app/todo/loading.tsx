export default function TodoLoading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 pb-28 pt-14">
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Planes
        </p>
        <h1 className="font-display text-3xl font-medium text-stone-800 sm:text-4xl">
          Cosas por hacer juntos
        </h1>
      </header>

      <div className="mx-auto w-full max-w-xl space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-2xl bg-stone-200"
          />
        ))}
      </div>
    </main>
  );
}
