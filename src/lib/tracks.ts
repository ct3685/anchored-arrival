export interface TrackCredit {
  name: string;
  url: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration?: string;
  createdBy: TrackCredit;
}

const reaper: TrackCredit = {
  name: 'Reaper ⛰️',
  url: 'https://tiktok.com/@cam.tik',
};

const aaron: TrackCredit = {
  name: 'Aaron',
  url: 'https://tiktok.com/@hollywooddetail205',
};

// Newest tracks first — prepend entries here so music UI and default queue stay current-first.
export const tracks: Track[] = [
  {
    id: 'we-dont-lose-when-it-matters',
    title: "We Don't Lose When It Matters",
    artist: 'Trevor & Ranch Squad',
    src: '/audio/we-dont-lose-when-it-matters.mp3',
    cover: '/images/covers/we-dont-lose-when-it-matters.jpg',
    createdBy: reaper,
  },
  {
    id: 'silent-pressure',
    title: 'Silent Pressure',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/silent-pressure.mp3',
    cover: '/images/covers/silent-pressure.jpg',
    createdBy: aaron,
  },
  {
    id: 'trevor-we-see-you',
    title: 'Trevor We See You',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/trevor-we-see-you.mp3',
    cover: '/images/covers/trevor-we-see-you.jpg',
    createdBy: aaron,
  },
  {
    id: 'ranch-squad-win',
    title: 'Ranch Squad WIN!',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/ranch-squad-win.mp3',
    cover: '/images/covers/ranch-squad-win.jpg',
    createdBy: aaron,
  },
  {
    id: 'ranch-squad-run-it-river-diss-track',
    title: 'Ranch Squad Run It (River Diss Track)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/ranch-squad-run-it-river-diss-track.mp3',
    cover: '/images/covers/ranch-squad-run-it-river-diss-track.jpg',
    createdBy: aaron,
  },
  {
    id: 'the-man-they-follow',
    title: 'The Man They Follow',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/the-man-they-follow.mp3',
    cover: '/images/covers/the-man-they-follow.jpg',
    createdBy: aaron,
  },
  {
    id: 'we-just-won-reset-river',
    title: 'We Just Won (Reset River)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/we-just-won-reset-river.mp3',
    cover: '/images/covers/we-just-won-reset-river.jpg',
    createdBy: reaper,
  },
  {
    id: 'lfgo-ranch-squad',
    title: 'LFGO Ranch Squad',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/lfgo-ranch-squad.mp3',
    cover: '/images/covers/lfgo-ranch-squad.jpg',
    createdBy: reaper,
  },
  {
    id: 'roll-call-comon-ranch-squad',
    title: "Roll Call (Com'On Ranch Squad)",
    artist: 'Trevor & Ranch Squad',
    src: '/audio/roll-call-comon-ranch-squad.mp3',
    cover: '/images/covers/roll-call-comon-ranch-squad.jpg',
    createdBy: reaper,
  },
  {
    id: 'cross-that-line',
    title: 'Cross That Line',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/cross-that-line.mp3',
    cover: '/images/trevor-profile.png',
    createdBy: aaron,
  },
  {
    id: 'gooder-than-shit',
    title: 'Gooder Than Shit (Ranch Anthem)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/gooder-than-shit-ranch-anthem.mp3',
    cover: '/images/covers/gooder-than-shit-ranch-anthem.jpg',
    createdBy: reaper,
  },
  {
    id: 'from-the-ranch-to-the-screen',
    title: 'From the Ranch to the Screen',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/from-the-ranch-to-the-screen.mp3',
    cover: '/images/covers/from-the-ranch-to-the-screen.jpg',
    createdBy: reaper,
  },
  {
    id: 'one-day-at-a-time',
    title: 'One Day at a Time (Ranch Squad Anthem)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/one-day-at-a-time-ranch-squad-anthem.mp3',
    cover: '/images/covers/one-day-at-a-time-ranch-squad-anthem.jpg',
    createdBy: reaper,
  },
  {
    id: 'we-still-breathin',
    title: 'We Still Breathin',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/we-still-breathin.mp3',
    cover: '/images/covers/we-still-breathin.jpg',
    createdBy: reaper,
  },
  {
    id: 'no-power-ups',
    title: 'No Power Ups',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/no-power-ups.mp3',
    cover: '/images/covers/no-power-ups.jpg',
    createdBy: reaper,
  },
  {
    id: 'ranch-squad-reset-rsr',
    title: 'Ranch Squad Reset (R-S-R)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/ranch-squad-reset-rsr.mp3',
    cover: '/images/covers/ranch-squad-reset-rsr.jpg',
    createdBy: aaron,
  },
  {
    id: 'ranch-squad-reset-tiktok',
    title: 'Ranch Squad Reset (TikTok Throwdown)',
    artist: 'Trevor & Ranch Squad',
    src: '/audio/ranch-squad-reset-tiktok-throwdown.mp3',
    cover: '/images/covers/ranch-squad-reset-tiktok-throwdown.jpg',
    createdBy: aaron,
  },
];
