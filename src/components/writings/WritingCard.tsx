import type { Writing } from "@/src/lib/writings";
import { formatWritingDate } from "@/src/lib/writings";

const AUTHOR_LABEL: Record<Writing["author"], string> = {
  Kev: "Él",
  Ana: "Ella",
};

const PREVIEW_LENGTH = 220;

type Props = {
  writing: Writing;
  onOpen: () => void;
};

export function WritingCard({ writing, onOpen }: Props) {
  const isLong = writing.content.length > PREVIEW_LENGTH;
  const preview = isLong
    ? writing.content.slice(0, PREVIEW_LENGTH).trimEnd() + "…"
    : writing.content;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full cursor-pointer rounded-3xl border border-stone-200/80 bg-white/50 p-6 text-left shadow-sm backdrop-blur-sm transition hover:shadow-md sm:p-8"
    >
      <div className="mb-3 flex items-center justify-between ">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide ${
            writing.author === "Kev"
              ? "bg-rose-100/80 text-rose-700"
              : "bg-stone-200/70 text-stone-600"
          }`}
        >
          {AUTHOR_LABEL[writing.author]}
        </span>
        <time className="text-xs text-stone-400">
          {formatWritingDate(writing.createdAt)}
        </time>
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
