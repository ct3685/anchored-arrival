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
    id: 'gooder-than-shit',
    title: 'Gooder Than Shit (Ranch Anthem)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/gooder-than-shit-ranch-anthem.mp3',
    cover: '/images/trevor-profile.png',
  },
  {
    id: 'from-the-ranch-to-the-screen',
    title: 'From the Ranch to the Screen',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/from-the-ranch-to-the-screen.mp3',
    cover: '/images/trevor-profile.png',
  },
  {
    id: 'one-day-at-a-time',
    title: 'One Day at a Time (Ranch Squad Anthem)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/one-day-at-a-time-ranch-squad-anthem.mp3',
    cover: '/images/trevor-profile.png',
  },
  {
    id: 'we-still-breathin',
    title: 'We Still Breathin',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/we-still-breathin.mp3',
    cover: '/images/trevor-profile.png',
  },
  {
    id: 'no-power-ups',
    title: 'No Power Ups',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/no-power-ups.mp3',
    cover: '/images/trevor-profile.png',
  },
  {
    id: 'ranch-squad-reset-rsr',
    title: 'Ranch Squad Reset (R-S-R)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/ranch-squad-reset-rsr.mp3',
    cover: '/images/trevor-profile.png',
  },
  {
    id: 'ranch-squad-reset-tiktok',
    title: 'Ranch Squad Reset (TikTok Throwdown)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/ranch-squad-reset-tiktok-throwdown.mp3',
    cover: '/images/trevor-profile.png',
  },
];
