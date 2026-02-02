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

interface AudioContextType {
  // State
  currentTrack: Track;
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;

  // Actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;

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
            milestone,
            'global'
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
        totalListenTimeRef.current,
        'global'
      );

      // Auto-play next track if available
      if (hasMultipleTracks && currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex((prev) => prev + 1);
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
      'global',
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
      listenDuration,
      'global'
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
      trackMusicSeek(currentTrack.id, oldTime, time, 'global');
    },
    [currentTrack.id, currentTime]
  );

  const nextTrack = useCallback(() => {
    const fromTrack = currentTrack;
    let toIndex: number;
    if (currentTrackIndex < tracks.length - 1) {
      toIndex = currentTrackIndex + 1;
    } else {
      toIndex = 0;
    }
    const toTrack = tracks[toIndex];
    trackMusicTrackChange(fromTrack.id, toTrack.id, toTrack.title, 'next');
    setCurrentTrackIndex(toIndex);
  }, [currentTrack, currentTrackIndex]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;

    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      if (audio) {
        trackMusicSeek(currentTrack.id, currentTime, 0, 'global');
        audio.currentTime = 0;
        setCurrentTime(0);
      }
    } else {
      const fromTrack = currentTrack;
      let toIndex: number;
      if (currentTrackIndex > 0) {
        toIndex = currentTrackIndex - 1;
      } else {
        toIndex = tracks.length - 1;
      }
      const toTrack = tracks[toIndex];
      trackMusicTrackChange(fromTrack.id, toTrack.id, toTrack.title, 'prev');
      setCurrentTrackIndex(toIndex);
    }
  }, [currentTrack, currentTrackIndex, currentTime]);

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
    play,
    pause,
    togglePlay,
    seek,
    nextTrack,
    prevTrack,
    selectTrack,
    formatTime,
    hasMultipleTracks,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}
