import { SpotifyEmbed } from "@/src/components/music/SpotifyEmbed";
import { playlists } from "@/src/lib/music";

export default function MusicPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 pb-28 pt-14">
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Música
        </p>
        <h1 className="font-display text-3xl font-medium text-stone-800 sm:text-4xl">
          Nuestras canciones
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-stone-500 sm:text-base">
          La banda sonora de lo que somos.
        </p>
      </header>

      <div className="space-y-10">
        {playlists.map((playlist) => (
          <section key={playlist.spotifyId} className="space-y-4">
            <div className="text-center sm:text-left">
              <h2 className="font-display text-xl text-stone-800">
                {playlist.title}
              </h2>
              {playlist.description && (
                <p className="mt-1 text-sm text-stone-500">
                  {playlist.description}
                </p>
              )}
            </div>

            <SpotifyEmbed
              spotifyId={playlist.spotifyId}
              title={playlist.title}
            />
          </section>
        ))}
      </div>
    </main>
  );
}
