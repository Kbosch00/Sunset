import { DaysCounter } from "../components/DaysCounter";

function getDaysTogether(since: Date) {
  const now = new Date();
  const start = new Date(since);
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diff = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export default function HomePage() {
  const sinceDate = new Date("2026-10-01");
  const days = getDaysTogether(sinceDate);

  return (
    <main className="fade-stagger relative flex min-h-screen flex-col items-center justify-center px-6 pb-28 pt-16">
      <div className="fade-enter w-full max-w-lg text-center">
        <p className="fade-enter mb-6 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Sunset
        </p>

        <h1 className="fade-enter font-display text-4xl font-medium leading-tight text-stone-800 sm:text-5xl">
          Hola,
          <br />
          <span className="text-rose-500">mi cielo</span>
        </h1>

        <div className="fade-enter mx-auto mt-12 max-w-xs rounded-3xl border border-stone-200/80 bg-white/50 px-8 py-8 shadow-sm backdrop-blur-sm">
          <p className="text-sm tracking-wide text-stone-400">
            Llevamos juntos
          </p>
          <DaysCounter value={days} className="fade-enter" />
          <p className="fade-enter mt-2 text-sm text-stone-500">
            {days === 1 ? "día" : "días"}
          </p>
        </div>
        <p className="fade-enter mx-auto mt-10 max-w-md text-base leading-relaxed text-stone-500 sm:text-lg">
          Este pequeño rincón es solo nuestro.
        </p>
      </div>
    </main>
  );
}
