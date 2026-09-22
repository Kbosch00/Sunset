export default function MemoriesLoading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 pb-28 pt-14">
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Recuerdos
        </p>
        <h1 className="font-display text-3xl font-medium text-stone-800 sm:text-4xl">
          Momentos nuestros
        </h1>
      </header>
      <div className="mb-8 flex justify-center gap-2">
        <div className="h-8 w-20 animate-pulse rounded-full bg-stone-200" />
        <div className="h-8 w-24 animate-pulse rounded-full bg-stone-200" />
        <div className="h-8 w-16 animate-pulse rounded-full bg-stone-200" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-3/4 animate-pulse rounded-2xl bg-stone-200"
          />
        ))}
      </div>
    </main>
  );
}
