import type { Writing } from "@/src/lib/writings";
import { formatWritingDate } from "@/src/lib/writings";

const AUTHOR_LABEL: Record<Writing["author"], string> = {
  Kev: "Kev",
  Ana: "Ana",
};

const PREVIEW_LENGTH_CONTENT = 130;
const PREVIEW_LENGTH_TITLE = 35;

type Props = {
  writing: Writing;
  onOpen: () => void;
};

export function WritingCard({ writing, onOpen }: Props) {
  const isLongContent = writing.content.length > PREVIEW_LENGTH_CONTENT;
  const isLongTitle = writing.content.length > PREVIEW_LENGTH_TITLE;
  const previewContent = isLongContent
    ? writing.content.slice(0, PREVIEW_LENGTH_CONTENT).trimEnd() + "…"
    : writing.content;
  const previewTitle = isLongTitle
    ? writing.title.slice(0, PREVIEW_LENGTH_TITLE).trimEnd() + "…"
    : writing.title;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full cursor-pointer rounded-3xl border border-stone-200/80 bg-white/50 p-4 text-left shadow-sm backdrop-blur-sm transition hover:shadow-md sm:p-5"
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide ${
            writing.author === "Kev"
              ? "bg-stone-100/80 text-stone-700"
              : "bg-rose-200/70 text-rose-600"
          }`}
        >
          {AUTHOR_LABEL[writing.author]}
        </span>
        <time className="text-xs text-stone-400">
          {formatWritingDate(writing.createdAt)}
        </time>
      </div>

      <h2 className="font-display text-lg font-medium wrap-break-word text-stone-800 transition group-hover:text-rose-600 sm:text-xl">
        {previewTitle}
      </h2>

      <p className="mt-1.5 line-clamp-2 whitespace-pre-line text-sm wrap-break-word leading-snug text-stone-600">
        {previewContent}
      </p>
    </button>
  );
}
