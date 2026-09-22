export type MemoryType = "image" | "video";

export type Album = {
  id: number;
  name: string;
};

export type Memory = {
  id: number;
  url: string;
  type: MemoryType;
  // null = no está en ninguna carpeta
  albumId: number | null;
  createdAt: string | Date;
};
