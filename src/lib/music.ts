export type Playlist = {
  title: string;
  description?: string;
  spotifyId: string;
};

export const playlists: Playlist[] = [
  {
    title: "Nuestra playlist",
    description: "Cuando por fin nos veamos",
    spotifyId: "5rpKJArkIK4ri1ZS7oq8km",
  },
  {
    title: "Cada que te pienso",
    description: "Las canciones que siempre me recuerdan a tí",
    spotifyId: "5LTHM1FzkSVVzrde8pYD9g",
  },
  {
    title: "Lo que soy para tí",
    description: "Las canciones que me has dedicado",
    spotifyId: "1dVNKKtIHTzymjeDgdGRbR",
  },
];
