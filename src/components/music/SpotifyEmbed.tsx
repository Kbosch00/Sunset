type Props = {
  spotifyId: string;
  title: string;
};

export function SpotifyEmbed({ spotifyId, title }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white/40 shadow-sm backdrop-blur-sm">
      <iframe
        title={title}
        src={`https://open.spotify.com/embed/playlist/${spotifyId}?utm_source=generator&theme=1`}
        width="100%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="block w-full rounded-xl"
        style={{ border: "none" }}
      />
    </div>
  );
}
