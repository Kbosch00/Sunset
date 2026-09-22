import { getMemories, getAlbums } from "@/src/app/actions/memories";
import { MemoriesView } from "@/src/components/memories/MemoriesView";

export default async function MemoriesPage() {
  const [items, albums] = await Promise.all([getMemories(), getAlbums()]);

  return (
    <main className="fade-stagger mx-auto min-h-screen w-full max-w-4xl px-4 pb-28 pt-14">
      <header className="fade-enter mb-10 text-center">
        <p className="fade-enter mb-3 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Recuerdos
        </p>
        <h1 className="fade-enter font-display text-3xl font-medium text-stone-800 sm:text-4xl">
          Momentos nuestros
        </h1>
        <p className="fade-enter mx-auto mt-4 max-w-md text-sm text-stone-500 sm:text-base">
          Lo que vamos creando juntos.
        </p>
      </header>

      <MemoriesView items={items} albums={albums} />
    </main>
  );
}
