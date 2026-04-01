'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { tracks, Track, type TrackCategory } from './tracks';
import {
  trackMusicPlay,
  trackMusicPause,
  trackMusicSeek,
  trackMusicTrackComplete,
  trackMusicMilestone,
  trackMusicTrackChange,
  trackAudioError,
  trackPlayCountIncrement,
} from './analytics';
import { incrementPlayCount, usePlayCounts } from './usePlayCounts';

type RepeatMode = 'off' | 'all' | 'one';
export type SortMode = 'default' | 'name-asc' | 'name-desc' | 'plays-desc' | 'plays-asc';
export type FilterValue = 'all' | TrackCategory;

interface AudioContextType {
  // State
  currentTrack: Track;
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  queue: number[];
  visibleQueue: number[];
  shuffle: boolean;
  repeatMode: RepeatMode;
  filter: FilterValue;
  sortMode: SortMode;
  playCounts: Record<string, number>;

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
  setFilter: (filter: FilterValue) => void;
  setSortMode: (mode: SortMode) => void;

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
  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    () => tracks.findIndex((t) => t.category === 'track') || 0
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<number[]>(() => tracks.map((_, i) => i));
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [filter, setFilter] = useState<FilterValue>('track');
  const [sortMode, setSortMode] = useState<SortMode>('default');

  const playCounts = usePlayCounts();

  // Analytics tracking refs
  const playStartTimeRef = useRef<number>(0);
  const totalListenTimeRef = useRef<number>(0);
  const milestonesReachedRef = useRef<Set<number>>(new Set());

  // Stable refs for MediaSession handlers — avoids stale closures in the
  // mount-only effect while keeping deps honest (no eslint-disable needed).
  const prevTrackRef = useRef<() => void>(() => {});
  const nextTrackRef = useRef<() => void>(() => {});
  const playRef = useRef<() => void>(() => {});
  const pauseRef = useRef<() => void>(() => {});
  const isPlayingRef = useRef(false);

  // Preserves the user's manual queue order across shuffle toggles.
  const userQueueRef = useRef<number[]>(tracks.map((_, i) => i));

  const currentTrack = tracks[currentTrackIndex];
  const hasMultipleTracks = tracks.length > 1;
  isPlayingRef.current = isPlaying;

  // Derived visible queue: filter by category, then sort.
  // Both TrackList and MiniPlayer consume this single source of truth.
  const visibleQueue = useMemo(() => {
    let filtered = queue.filter(
      (idx) => filter === 'all' || tracks[idx].category === filter
    );

    if (sortMode === 'name-asc') {
      filtered = [...filtered].sort((a, b) =>
        tracks[a].title.localeCompare(tracks[b].title)
      );
    } else if (sortMode === 'name-desc') {
      filtered = [...filtered].sort((a, b) =>
        tracks[b].title.localeCompare(tracks[a].title)
      );
    } else if (sortMode === 'plays-desc') {
      filtered = [...filtered].sort(
        (a, b) =>
          (playCounts[tracks[b].id] ?? 0) - (playCounts[tracks[a].id] ?? 0)
      );
    } else if (sortMode === 'plays-asc') {
      filtered = [...filtered].sort(
        (a, b) =>
          (playCounts[tracks[a].id] ?? 0) - (playCounts[tracks[b].id] ?? 0)
      );
    }

    return filtered;
  }, [queue, filter, sortMode, playCounts]);

  // Ref stays in sync so event-listener closures always see latest visibleQueue
  const visibleQueueRef = useRef(visibleQueue);
  visibleQueueRef.current = visibleQueue;

  // Create audio element on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }
  }, []);

  // ─── Media Session API ───
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

  // NOTE: setPositionState is intentionally omitted — on iOS Safari, calling it
  // causes the lock screen to show seek-forward/back buttons instead of
  // prev/next track buttons.
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator))
      return;
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
  }, [isPlaying]);

  // Media Session action handlers (CarPlay/lock screen controls)
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator))
      return;

    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ['play', () => playRef.current()],
      ['pause', () => pauseRef.current()],
      ['previoustrack', () => prevTrackRef.current()],
      ['nexttrack', () => nextTrackRef.current()],
    ];

    for (const [action, handler] of handlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {}
    }

    return () => {
      for (const [action] of handlers) {
        try {
          navigator.mediaSession.setActionHandler(action, null);
        } catch {}
      }
    };
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
          trackMusicMilestone(currentTrack.id, currentTrack.title, milestone);
        }
      }
    }
  }, [currentTime, duration, currentTrack.id, currentTrack.title]);

  // Count a play whenever playback starts
  useEffect(() => {
    if (isPlaying) {
      incrementPlayCount(currentTrack.id);
      trackPlayCountIncrement(currentTrack.id, currentTrack.title);
    }
  }, [isPlaying, currentTrack.id, currentTrack.title]);

  // Helper: find next track index in visibleQueue relative to current track.
  // Returns -1 when there is no valid next (end of list with repeat=off).
  const findNextInVisible = useCallback(
    (curIdx: number, mode: RepeatMode): number => {
      const vq = visibleQueueRef.current;
      if (vq.length === 0) return -1;

      const pos = vq.indexOf(curIdx);
      if (pos === -1) return vq[0];

      if (pos < vq.length - 1) return vq[pos + 1];

      // At end of visible list
      if (mode === 'all') return vq[0];
      return -1; // repeat=off — stop
    },
    []
  );

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
        milestonesReachedRef.current = new Set();
        totalListenTimeRef.current = 0;
        incrementPlayCount(currentTrack.id);
        trackPlayCountIncrement(currentTrack.id, currentTrack.title);
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.error(err);
          setIsPlaying(false);
        });
        return;
      }

      if (repeatMode === 'all') {
        if (!hasMultipleTracks) {
          milestonesReachedRef.current = new Set();
          totalListenTimeRef.current = 0;
          incrementPlayCount(currentTrack.id);
          trackPlayCountIncrement(currentTrack.id, currentTrack.title);
          audio.currentTime = 0;
          audio.play().catch((err) => {
            console.error(err);
            setIsPlaying(false);
          });
          return;
        }
        const nextIdx = findNextInVisible(currentTrackIndex, 'all');
        if (nextIdx !== -1) {
          setCurrentTrackIndex(nextIdx);
        } else {
          setIsPlaying(false);
        }
        return;
      }

      // repeatMode === 'off' — advance to next in visible queue, stop at end
      const nextIdx = findNextInVisible(currentTrackIndex, 'off');
      if (nextIdx !== -1) {
        setCurrentTrackIndex(nextIdx);
      } else {
        setIsPlaying(false);
      }
    };
    const handleError = () => {
      trackAudioError(currentTrack.id, 'playback_error');
      setIsPlaying(false);

      const code = audio.error?.code;
      if (code === MediaError.MEDIA_ERR_NETWORK) {
        setTimeout(() => {
          audio.load();
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }, 2000);
      }
    };

    const handleWaiting = () => {};
    const handleStalled = () => {};
    const handlePlaying = () => {
      if (!isPlayingRef.current) setIsPlaying(true);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('stalled', handleStalled);
    audio.addEventListener('playing', handlePlaying);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('stalled', handleStalled);
      audio.removeEventListener('playing', handlePlaying);
    };
  }, [
    currentTrackIndex,
    hasMultipleTracks,
    currentTrack.id,
    currentTrack.title,
    repeatMode,
    findNextInVisible,
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

    if (isPlayingRef.current) {
      audio.play().catch((err) => {
        console.error(err);
        setIsPlaying(false);
      });
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

  // Sync isPlaying with actual audio element state when page visibility changes.
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio || document.visibilityState !== 'visible') return;

      const actuallyPlaying = !audio.paused && !audio.ended;
      if (isPlayingRef.current !== actuallyPlaying) {
        setIsPlaying(actuallyPlaying);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => {
        trackMusicPlay(
          currentTrack.id,
          currentTrack.title,
          currentTrack.artist,
          currentTime
        );
        setIsPlaying(true);
      })
      .catch(console.error);
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
    const vq = visibleQueueRef.current;

    if (repeatMode === 'one' || !hasMultipleTracks) {
      const pos = vq.indexOf(currentTrackIndex);
      const nextPos = pos < vq.length - 1 ? pos + 1 : 0;
      const toIndex = vq.length > 0 ? vq[nextPos] : currentTrackIndex;
      const toTrack = tracks[toIndex];
      trackMusicTrackChange(fromTrack.id, toTrack.id, toTrack.title, 'next');
      setCurrentTrackIndex(toIndex);
      return;
    }

    const nextIdx = findNextInVisible(currentTrackIndex, repeatMode);
    if (nextIdx !== -1) {
      const toTrack = tracks[nextIdx];
      trackMusicTrackChange(fromTrack.id, toTrack.id, toTrack.title, 'next');
      setCurrentTrackIndex(nextIdx);
    } else {
      setIsPlaying(false);
    }
  }, [currentTrack, currentTrackIndex, repeatMode, hasMultipleTracks, findNextInVisible]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;

    if (currentTime > 3) {
      if (audio) {
        trackMusicSeek(currentTrack.id, currentTime, 0);
        audio.currentTime = 0;
        setCurrentTime(0);
      }
    } else {
      const fromTrack = currentTrack;
      const vq = visibleQueueRef.current;
      const pos = vq.indexOf(currentTrackIndex);
      const prevPos = pos > 0 ? pos - 1 : vq.length - 1;
      const toIndex = vq.length > 0 ? vq[prevPos] : currentTrackIndex;
      const toTrack = tracks[toIndex];
      trackMusicTrackChange(fromTrack.id, toTrack.id, toTrack.title, 'prev');
      setCurrentTrackIndex(toIndex);
    }
  }, [currentTrack, currentTrackIndex, currentTime]);

  // Keep refs in sync so MediaSession handlers always call latest versions
  playRef.current = play;
  pauseRef.current = pause;
  nextTrackRef.current = nextTrack;
  prevTrackRef.current = prevTrack;

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
        togglePlay();
      }
    },
    [currentTrack, currentTrackIndex, togglePlay]
  );

  const moveTrackInQueue = useCallback(
    (fromPos: number, toPos: number) => {
      if (
        fromPos < 0 ||
        fromPos >= queue.length ||
        toPos < 0 ||
        toPos >= queue.length
      )
        return;
      setQueue((prev) => {
        const next = [...prev];
        const [moved] = next.splice(fromPos, 1);
        next.splice(toPos, 0, moved);
        if (!shuffle) userQueueRef.current = next;
        return next;
      });
    },
    [queue.length, shuffle]
  );

  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => {
      const next = !prev;
      if (next) {
        setQueue((q) => {
          userQueueRef.current = q;
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
        setQueue(userQueueRef.current);
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
    visibleQueue,
    shuffle,
    repeatMode,
    filter,
    sortMode,
    playCounts,
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
    setFilter,
    setSortMode,
    formatTime,
    hasMultipleTracks,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}
