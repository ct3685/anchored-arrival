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
    id: 'coming-soon',
    title: 'Coming Soon',
    artist: 'Ranch Squad',
    src: '',
    cover: '/images/trevor-profile.png',
  },
];
