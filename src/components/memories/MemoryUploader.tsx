"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/src/lib/uploadthing";
import { useToast } from "../Toast";

type Props = {
  albumId: number | null;
};

export function MemoryUploader({ albumId }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const { startUpload, isUploading } = useUploadThing("memoryUploader", {
    onClientUploadComplete: (res) => {
      router.refresh();
      const count = res?.length ?? 1;
      showToast(
        count === 1
          ? "Recuerdo agregado 🌷"
          : `${count} recuerdos agregados 🌷`,
      );
    },
    onUploadError: (err) => {
      setError(err.message);
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setError("");
    startUpload(files, { albumId });
    e.target.value = "";
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="cursor-pointer rounded-full bg-rose-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-600 disabled:opacity-50"
      >
        {isUploading ? "Subiendo..." : "+ Agregar recuerdo"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-sm text-rose-500">{error}</p>}
    </div>
  );
}
