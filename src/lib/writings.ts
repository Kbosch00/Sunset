export type Author = "Kev" | "Ana";

export type Writing = {
  id: number;
  author: Author;
  title: string;
  content: string;
  createdAt: string | Date;
};

export function formatWritingDate(value: string | Date) {
  return new Date(value).toLocaleDateString("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
