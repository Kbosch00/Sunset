export type MemoryType = "image" | "video";

export type Album = {
  id: number;
  name: string;
};

export type Memory = {
  id: number;
  url: string;
  type: MemoryType;
  albumId: number | null;
  createdAt: string | Date;
};
