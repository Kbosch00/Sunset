"use client";

import { useMemo, useState } from "react";
import type { Playlist } from "@/src/lib/music";
import { SpotifyEmbed } from "./SpotifyEmbed";

type Props = {
  playlists: Playlist[];
};

const PER_PAGE = 4;

export function MusicView({ playlists }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(playlists.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return playlists.slice(start, start + PER_PAGE);
  }, [playlists, currentPage]);

  if (playlists.length === 0) {
    return (
      <p className="text-center text-stone-400">
        Aún no hay playlists por aquí.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {paginated.map((playlist) => (
          <section key={playlist.spotifyId} className="space-y-3">
            <div className="text-center md:text-left">
              <h2 className="font-display text-xl text-stone-800">
                {playlist.title}
              </h2>
              {playlist.description ? (
                <p className="mt-1 text-sm text-stone-500">
                  {playlist.description}
                </p>
              ) : null}
            </div>
            <SpotifyEmbed
              spotifyId={playlist.spotifyId}
              title={playlist.title}
            />
          </section>
        ))}
      </div>

      {playlists.length > PER_PAGE ? (
        <nav
          className="flex items-center justify-center gap-4 pt-2"
          aria-label="Paginación de playlists"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600 transition hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-sm text-stone-500">
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600 transition hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </nav>
      ) : null}
    </div>
  );
}
