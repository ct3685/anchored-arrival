export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration?: string;
}

export const tracks: Track[] = [
  {
    id: 'live-and-lethal',
    title: "Ranch Squad Anthem",
    artist: 'Trevor',
    src: '/music/live-and-lethal/track.mp3',
    cover: '/music/live-and-lethal/cover.png',
  },
];
