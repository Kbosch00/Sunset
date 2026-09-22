import { getWritings } from "@/src/app/actions/writings";
import { WritingsList } from "@/src/components/writings/WritingsList";

export default async function WritingsPage() {
  const writings = await getWritings();

  return (
    <main className="fade-stagger mx-auto min-h-screen w-full max-w-2xl px-4 pb-28 pt-14">
      <header className="fade-enter mb-10 text-center">
        <p className="fade-enter mb-3 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Escritos
        </p>
        <h1 className="fade-enter font-display text-3xl font-medium text-stone-800 sm:text-4xl">
          Lo que nos decimos
        </h1>
        <p className="fade-enter mx-auto mt-4 max-w-md text-sm text-stone-500 sm:text-base">
          Palabras que hemos guardado, tuyas y mías.
        </p>
      </header>

      <WritingsList writings={writings} />
    </main>
  );
}
