import type { Writing } from "@/src/lib/writings";

// Cómo se muestra cada autor en la etiqueta de la tarjeta.
// Cámbialo si quieren usar sus nombres reales en vez de "Él"/"Ella".
const AUTHOR_LABEL: Record<Writing["author"], string> = {
  yo: "Él",
  ella: "Ella",
};

// Cuántos caracteres mostramos en la vista previa de la tarjeta
const PREVIEW_LENGTH = 220;

type Props = {
  writing: Writing;
  // Función que el padre (WritingsList) nos pasa para avisarle
  // "el usuario hizo clic en esta tarjeta, abre el lightbox"
  onOpen: () => void;
};

export function WritingCard({ writing, onOpen }: Props) {
  const isLong = writing.content.length > PREVIEW_LENGTH;
  const preview = isLong
    ? writing.content.slice(0, PREVIEW_LENGTH).trimEnd() + "…"
    : writing.content;

  return (
    // Es un <button> (no un <div>) para que sea accesible con teclado
    // y lectores de pantalla, igual que las tarjetas de Recuerdos.
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full cursor-pointer rounded-3xl border border-stone-200/80 bg-white/50 p-6 text-left shadow-sm backdrop-blur-sm transition hover:shadow-md sm:p-8"
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide ${
            writing.author === "yo"
              ? "bg-rose-100/80 text-rose-700"
              : "bg-stone-200/70 text-stone-600"
          }`}
        >
          {AUTHOR_LABEL[writing.author]}
        </span>
        <time className="text-xs text-stone-400">{writing.date}</time>
      </div>

      <h2 className="font-display text-xl font-medium text-stone-800 transition group-hover:text-rose-600 sm:text-2xl">
        {writing.title}
      </h2>

      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone-600 sm:text-base">
        {preview}
      </p>
    </button>
  );
}
