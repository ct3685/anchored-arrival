export interface ImageData {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export const galleryImages: ImageData[] = [
  {
    src: '/images/main-character.png',
    alt: 'Main Character Morgie',
    title: 'Main Character',
    description: 'Main character energy - sparkles and all ✨',
  },
  {
    src: '/images/mvp.png',
    alt: 'MVP Morgie with Crown',
    title: 'MVP Queen',
    description: 'Crown secured, arms crossed, winning 👑',
  },
  {
    src: '/images/dj-glasses.png',
    alt: 'DJ Morgie with Cat Ear Headphones',
    title: 'DJ Mode',
    description: 'Cat ear headphones and vibes only 🎧',
  },
  {
    src: '/images/leon-fafo.png',
    alt: 'Morgie with Lion FAFO Vibe',
    title: 'FAFO Energy',
    description: 'F around and find out - with the squad 🦁',
  },
  {
    src: '/images/morgie-matrix.png',
    alt: 'Matrix Style Morgie',
    title: 'Matrix Mode',
    description: 'Agent Morgie, taking the red pill 🖤',
  },
  {
    src: '/images/morgie-goof.png',
    alt: 'Morgie and Goof Nugget',
    title: 'Morgie & Goof Nugget',
    description: 'Cozy vibes with the best sidekick 🍗',
  },
  {
    src: '/images/live-and-lethal.png',
    alt: 'Live and Lethal Album Art',
    title: 'Live... And Lethal',
    description: "Morgie's on a mission! 💥",
  },
  {
    src: '/images/morgan-vibing.png',
    alt: 'Morgan Vibing',
    title: 'Good Vibes Only',
    description: 'Just vibing and living life ✨',
  },
];

export const featuredImage = galleryImages[0];
