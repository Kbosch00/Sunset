"use client";

import { useMemo, useState } from "react";
import type { Playlist } from "@/src/lib/music";
import { SpotifyEmbed } from "./SpotifyEmbed";
import { Pagination } from "../Pagination";

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
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}
