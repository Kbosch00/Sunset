import { MemoriesGallery } from "@/src/components/memories/MemoriesGallery";
import { getMemoryItems } from "@/src/lib/memories";

export default function MemoriesPage() {
  const items = getMemoryItems();

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 pb-28 pt-14">
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Recuerdos
        </p>
        <h1 className="font-display text-3xl font-medium text-stone-800 sm:text-4xl">
          Momentos nuestros
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-stone-500 sm:text-base">
          Pequeñas capturas de lo que vamos construyendo juntos.
        </p>
      </header>
      <MemoriesGallery items={items} />
    </main>
  );
}
