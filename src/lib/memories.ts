import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"]);

export type MemoryItem = {
  src: string;
  type: "image" | "video";
};

export function getMemoryItems(): MemoryItem[] {
  const dir = path.join(process.cwd(), "public", "memories");

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext);
    })
    .sort()
    .map((file) => {
      const ext = path.extname(file).toLowerCase();
      return {
        src: `/memories/${file}`,
        type: VIDEO_EXTENSIONS.has(ext) ? "video" : "image",
      } satisfies MemoryItem;
    });
}
