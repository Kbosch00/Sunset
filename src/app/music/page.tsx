import { MusicView } from "@/src/components/music/MusicView";
import { playlists } from "@/src/lib/music";

export default function MusicPage() {
  return (
    <main className="fade-stagger mx-auto min-h-screen w-full max-w-6xl px-4 pb-28 pt-14">
      <header className="fade-enter mb-10 text-center">
        <p className="fade-enter mb-3 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Música
        </p>
        <h1 className="fade-enter font-display text-3xl font-medium text-stone-800 sm:text-4xl">
          Nuestras canciones
        </h1>
        <p className="fade-enter mx-auto mt-4 max-w-md text-sm text-stone-500 sm:text-base">
          Cuando las palabras no bastan para expresar lo que sentimos.
        </p>
      </header>

      <MusicView playlists={playlists} />
    </main>
  );
}
