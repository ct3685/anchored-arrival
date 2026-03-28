export interface ImageData {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export const galleryImages: ImageData[] = [
  {
    src: '/images/trevor-profile.png',
    alt: 'Trevor - Ranch Squad',
    title: 'Ranch Squad Commander',
    description: "Com'On in — the ranch is open ✨",
  },
  {
    src: '/images/trevor-main.jpg',
    alt: 'Trevor Brachtenbach',
    title: 'Trevor',
    description: 'Gooder than shit 🤠',
  },
  {
    src: '/images/trevor-merch1.png',
    alt: 'Trevor Merch',
    title: 'King Street Cowboys',
    description: 'Rep the Ranch Squad 👕',
  },
  {
    src: '/images/trevor-merch2.png',
    alt: 'Trevor Merch',
    title: 'Merch Drop',
    description: 'Fresh gear for the squad 🔥',
  },
];
