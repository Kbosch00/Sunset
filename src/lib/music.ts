export type Playlist = {
  title: string;
  description?: string;
  // ID de la playlist de Spotify (la parte final del link)
  // Ejemplo: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
  //                                  → 37i9dQZF1DXcBWIGoYBM5M
  spotifyId: string;
};

export const playlists: Playlist[] = [
  {
    title: "Nuestra playlist",
    description: "Las canciones que nos representan",
    spotifyId: "5rpKJArkIK4ri1ZS7oq8km", // ← cámbialo
  },
  // Puedes agregar más:
  // {
  //   title: "Viajes",
  //   description: "Para los caminos juntos",
  //   spotifyId: "OTRO_ID",
  // },
];
