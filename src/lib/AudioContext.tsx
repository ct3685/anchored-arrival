'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { tracks, Track } from './tracks';
import {
  trackMusicPlay,
  trackMusicPause,
  trackMusicSeek,
  trackMusicTrackComplete,
  trackMusicMilestone,
  trackMusicTrackChange,
  trackAudioError,
} from './analytics';
import { reportWebVitals } from './webVitals';

type RepeatMode = 'off' | 'all' | 'one';

interface AudioContextType {
  // State
  currentTrack: Track;
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  queue: number[];
  shuffle: boolean;
  repeatMode: RepeatMode;

  // Actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;
  moveTrackInQueue: (fromPos: number, toPos: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;

  // Utilities
  formatTime: (time: number) => string;
  hasMultipleTracks: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<number[]>(() =>
    tracks.map((_, i) => i)
  );
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');

  // Analytics tracking refs
  const playStartTimeRef = useRef<number>(0);
  const totalListenTimeRef = useRef<number>(0);
  const milestonesReachedRef = useRef<Set<number>>(new Set());

  const currentTrack = tracks[currentTrackIndex];
  const hasMultipleTracks = tracks.length > 1;

  // Create audio element on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }
  }, []);

  // Initialize Core Web Vitals reporting (delayed to not block initial render)
  useEffect(() => {
    const timer = setTimeout(() => {
      reportWebVitals();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ─── Media Session API ───
  // Updates lock screen / CarPlay / Bluetooth with track info & controls
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator))
      return;

    const coverUrl = currentTrack.cover.startsWith('http')
      ? currentTrack.cover
      : `${window.location.origin}${currentTrack.cover}`;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      album: 'Ranch Squad',
      artwork: [
        { src: coverUrl, sizes: '96x96', type: 'image/jpeg' },
        { src: coverUrl, sizes: '128x128', type: 'image/jpeg' },
        { src: coverUrl, sizes: '192x192', type: 'image/jpeg' },
        { src: coverUrl, sizes: '256x256', type: 'image/jpeg' },
        { src: coverUrl, sizes: '384x384', type: 'image/jpeg' },
        { src: coverUrl, sizes: '512x512', type: 'image/jpeg' },
      ],
    });
  }, [currentTrack]);

  // Update Media Session playback state & position
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator))
      return;
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    if (duration > 0 && isFinite(duration)) {
      try {
        navigator.mediaSession.setPositionState({
          duration,
          playbackRate: 1,
          position: Math.min(currentTime, duration),
        });
      } catch { /* ignore */ }
    }
  }, [isPlaying, currentTime, duration]);


  // Media Session action handlers (CarPlay/lock screen controls)
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    try { navigator.mediaSession.setActionHandler('play', () => { audioRef.current?.play(); setIsPlaying(true); }); } catch {}
    try { navigator.mediaSession.setActionHandler('pause', () => { audioRef.current?.pause(); setIsPlaying(false); }); } catch {}
    try { navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack()); } catch {}
    try { navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack()); } catch {}
    try { navigator.mediaSession.setActionHandler('seekto', (d) => { if (d.seekTime != null && audioRef.current) { audioRef.current.currentTime = d.seekTime; setCurrentTime(d.seekTime); } }); } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update document title with current track
  useEffect(() => {
    if (isPlaying) {
      document.title = `${currentTrack.title} — ${currentTrack.artist} | Ranch Squad`;
    } else {
      document.title = 'Trevor | Ranch Squad';
    }
  }, [isPlaying, currentTrack.title, currentTrack.artist]);

  // Track milestones
  useEffect(() => {
    if (duration > 0 && currentTime > 0) {
      const percentage = (currentTime / duration) * 100;
      const milestones = [25, 50, 75, 100] as const;

      for (const milestone of milestones) {
        if (
          percentage >= milestone &&
          !milestonesReachedRef.current.has(milestone)
        ) {
          milestonesReachedRef.current.add(milestone);
          trackMusicMilestone(
            currentTrack.id,
            currentTrack.title,
            milestone
          );
        }
      }
    }
  }, [currentTime, duration, currentTrack.id, currentTrack.title]);

  // Set up audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      trackMusicTrackComplete(
        currentTrack.id,
        currentTrack.title,
        totalListenTimeRef.current
      );

      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.error);
        return;
      }
      // Auto-play next track in queue order
      const queuePos = queue.indexOf(currentTrackIndex);
      if (hasMultipleTracks && queuePos < queue.length - 1) {
        setCurrentTrackIndex(queue[queuePos + 1]);
      } else if (repeatMode === 'all' && hasMultipleTracks) {
        setCurrentTrackIndex(queue[0]);
      } else {
        setIsPlaying(false);
      }
    };
    const handleError = () => {
      trackAudioError(currentTrack.id, 'playback_error');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [
    currentTrackIndex,
    hasMultipleTracks,
    currentTrack.id,
    currentTrack.title,
    queue,
    repeatMode,
  ]);

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    setCurrentTime(0);
    setDuration(0);
    milestonesReachedRef.current = new Set();
    totalListenTimeRef.current = 0;

    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [currentTrackIndex, currentTrack.src]);

  // Track listen time while playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      playStartTimeRef.current = Date.now();
      interval = setInterval(() => {
        totalListenTimeRef.current += 1;
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch(console.error);
    trackMusicPlay(
      currentTrack.id,
      currentTrack.title,
      currentTrack.artist,
      currentTime
    );
    setIsPlaying(true);
  }, [currentTrack, currentTime]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    const listenDuration = (Date.now() - playStartTimeRef.current) / 1000;
    trackMusicPause(
      currentTrack.id,
      currentTrack.title,
      currentTime,
      listenDuration
    );
    setIsPlaying(false);
  }, [currentTrack, currentTime]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback(
    (time: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      const oldTime = currentTime;
      audio.currentTime = time;
      setCurrentTime(time);
      trackMusicSeek(currentTrack.id, oldTime, time);
    },
    [currentTrack.id, currentTime]
  );

  const nextTrack = useCallback(() => {
    const fromTrack = currentTrack;
    const queuePos = queue.indexOf(currentTrackIndex);
    const nextPos = queuePos < queue.length - 1 ? queuePos + 1 : 0;
    const toIndex = queue[nextPos];
    const toTrack = tracks[toIndex];
    trackMusicTrackChange(fromTrack.id, toTrack.id, toTrack.title, 'next');
    setCurrentTrackIndex(toIndex);
  }, [currentTrack, currentTrackIndex, queue]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;

    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      if (audio) {
        trackMusicSeek(currentTrack.id, currentTime, 0);
        audio.currentTime = 0;
        setCurrentTime(0);
      }
    } else {
      const fromTrack = currentTrack;
      const queuePos = queue.indexOf(currentTrackIndex);
      const prevPos = queuePos > 0 ? queuePos - 1 : queue.length - 1;
      const toIndex = queue[prevPos];
      const toTrack = tracks[toIndex];
      trackMusicTrackChange(fromTrack.id, toTrack.id, toTrack.title, 'prev');
      setCurrentTrackIndex(toIndex);
    }
  }, [currentTrack, currentTrackIndex, currentTime, queue]);

  const selectTrack = useCallback(
    (index: number) => {
      if (index >= 0 && index < tracks.length && index !== currentTrackIndex) {
        const fromTrack = currentTrack;
        const toTrack = tracks[index];
        trackMusicTrackChange(
          fromTrack.id,
          toTrack.id,
          toTrack.title,
          'select'
        );
        setCurrentTrackIndex(index);
        setIsPlaying(true);
      } else if (index === currentTrackIndex) {
        // If selecting current track, toggle play
        togglePlay();
      }
    },
    [currentTrack, currentTrackIndex, togglePlay]
  );

  const moveTrackInQueue = useCallback(
    (fromPos: number, toPos: number) => {
      if (fromPos < 0 || fromPos >= queue.length || toPos < 0 || toPos >= queue.length) return;
      setQueue((prev) => {
        const next = [...prev];
        const [moved] = next.splice(fromPos, 1);
        next.splice(toPos, 0, moved);
        return next;
      });
    },
    [queue.length]
  );

  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => {
      const next = !prev;
      if (next) {
        setQueue((q) => {
          const currentPos = q.indexOf(currentTrackIndex);
          const newQueue = [...q];
          newQueue.splice(currentPos, 1);
          for (let i = newQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newQueue[i], newQueue[j]] = [newQueue[j], newQueue[i]];
          }
          return [currentTrackIndex, ...newQueue];
        });
      } else {
        setQueue(tracks.map((_, i) => i));
      }
      return next;
    });
  }, [currentTrackIndex]);

  const cycleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const value: AudioContextType = {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    queue,
    shuffle,
    repeatMode,
    play,
    pause,
    togglePlay,
    seek,
    nextTrack,
    prevTrack,
    selectTrack,
    moveTrackInQueue,
    toggleShuffle,
    cycleRepeat,
    formatTime,
    hasMultipleTracks,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}
