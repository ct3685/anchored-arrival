'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Box,
  IconButton,
  Typography,
  Slider,
  Stack,
  Paper,
  Collapse,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'motion/react';

import { tracks, Track } from '@/lib/tracks';
import { colors } from '@/theme/theme';
import {
  trackMusicPlay,
  trackMusicPause,
  trackMusicSeek,
  trackMusicTrackComplete,
  trackMusicMilestone,
  trackMusicTrackChange,
  trackMiniplayerExpand,
  trackMiniplayerCollapse,
  trackAudioError,
} from '@/lib/analytics';

export default function MiniPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Analytics tracking refs
  const playStartTimeRef = useRef<number>(0);
  const totalListenTimeRef = useRef<number>(0);
  const milestonesReachedRef = useRef<Set<number>>(new Set());

  const currentTrack: Track = tracks[currentTrackIndex];
  const hasMultipleTracks = tracks.length > 1;

  // Track milestones
  useEffect(() => {
    if (duration > 0 && currentTime > 0) {
      const percentage = (currentTime / duration) * 100;
      const milestones = [25, 50, 75, 100] as const;
      
      for (const milestone of milestones) {
        if (percentage >= milestone && !milestonesReachedRef.current.has(milestone)) {
          milestonesReachedRef.current.add(milestone);
          trackMusicMilestone(currentTrack.id, currentTrack.title, milestone, 'mini');
        }
      }
    }
  }, [currentTime, duration, currentTrack.id, currentTrack.title]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Track completion
      trackMusicTrackComplete(
        currentTrack.id,
        currentTrack.title,
        totalListenTimeRef.current,
        'mini'
      );
      
      // Auto-play next track if available, otherwise stop
      if (hasMultipleTracks && currentTrackIndex < tracks.length - 1) {
        nextTrack();
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
  }, [currentTrackIndex, hasMultipleTracks, currentTrack.id, currentTrack.title]);

  // Reset time and milestones when track changes
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    milestonesReachedRef.current = new Set();
    totalListenTimeRef.current = 0;
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

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

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      const listenDuration = (Date.now() - playStartTimeRef.current) / 1000;
      trackMusicPause(currentTrack.id, currentTrack.title, currentTime, listenDuration, 'mini');
    } else {
      audio.play();
      trackMusicPlay(currentTrack.id, currentTrack.title, currentTrack.artist, 'mini', currentTime);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (_: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value as number;
    const oldTime = currentTime;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    trackMusicSeek(currentTrack.id, oldTime, newTime, 'mini');
  };

  const nextTrack = () => {
    const fromTrack = currentTrack;
    let toIndex: number;
    if (currentTrackIndex < tracks.length - 1) {
      toIndex = currentTrackIndex + 1;
    } else {
      toIndex = 0; // Loop to first
    }
    const toTrack = tracks[toIndex];
    trackMusicTrackChange(fromTrack.id, toTrack.id, toTrack.title, 'next');
    setCurrentTrackIndex(toIndex);
  };

  const prevTrack = () => {
    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      const audio = audioRef.current;
      if (audio) {
        trackMusicSeek(currentTrack.id, currentTime, 0, 'mini');
        audio.currentTime = 0;
        setCurrentTime(0);
      }
    } else {
      const fromTrack = currentTrack;
      let toIndex: number;
      if (currentTrackIndex > 0) {
        toIndex = currentTrackIndex - 1;
      } else {
        toIndex = tracks.length - 1; // Loop to last
      }
      const toTrack = tracks[toIndex];
      trackMusicTrackChange(fromTrack.id, toTrack.id, toTrack.title, 'prev');
      setCurrentTrackIndex(toIndex);
    }
  };

  const handleExpandToggle = () => {
    if (isExpanded) {
      trackMiniplayerCollapse(currentTrack.id);
    } else {
      trackMiniplayerExpand(currentTrack.id);
    }
    setIsExpanded(!isExpanded);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const truncateTitle = (title: string, maxLength: number = 20) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          right: 20,
          zIndex: 1300,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            background: `linear-gradient(135deg, ${colors.surface}EE 0%, ${colors.background}EE 100%)`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${colors.primary}44`,
            borderRadius: 3,
            overflow: 'hidden',
            width: { xs: 'auto', sm: 'fit-content' },
            maxWidth: { xs: '100%', sm: 320 },
            marginLeft: { xs: 0, sm: 'auto' },
            minWidth: isExpanded ? { xs: '100%', sm: 280 } : 'auto',
            transition: 'min-width 0.3s ease, width 0.3s ease',
          }}
        >
          <audio ref={audioRef} src={currentTrack.src} preload="metadata" />

          {/* Collapsed View */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ p: 1 }}
          >
            {/* Album Art */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: isPlaying
                    ? `0 0 15px ${colors.primary}66`
                    : `0 0 8px ${colors.primary}33`,
                  transition: 'box-shadow 0.3s ease',
                }}
                onClick={handleExpandToggle}
              >
                <Image
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </motion.div>

            {/* Play/Pause Button */}
            <IconButton
              onClick={togglePlay}
              size="small"
              sx={{
                backgroundColor: `${colors.primary}22`,
                color: colors.primary,
                '&:hover': {
                  backgroundColor: `${colors.primary}44`,
                },
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            {/* Track Title (collapsed) - flex to fill available space */}
            {!isExpanded && (
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  flex: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentTrack.title}
              </Typography>
            )}

            {/* Expand/Collapse Toggle - pushed to right edge */}
            <IconButton
              onClick={handleExpandToggle}
              size="small"
              sx={{ color: colors.textSecondary, flexShrink: 0 }}
            >
              {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Stack>

          {/* Expanded View */}
          <Collapse in={isExpanded}>
            <Box sx={{ px: 2, pb: 2 }}>
              {/* Track Info */}
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: 0.5,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentTrack.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: colors.textSecondary, display: 'block', mb: 1 }}
              >
                {currentTrack.artist}
              </Typography>

              {/* Progress Bar */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.65rem' }}>
                  {formatTime(currentTime)}
                </Typography>
                <Slider
                  value={currentTime}
                  max={duration || 100}
                  onChange={handleSeek}
                  size="small"
                  sx={{
                    color: colors.primary,
                    '& .MuiSlider-thumb': {
                      width: 8,
                      height: 8,
                    },
                    '& .MuiSlider-track': {
                      background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.65rem' }}>
                  {formatTime(duration)}
                </Typography>
              </Stack>

              {/* Controls (shown when multiple tracks or always for consistency) */}
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ mt: 1 }}
              >
                <IconButton
                  onClick={prevTrack}
                  size="small"
                  sx={{
                    color: hasMultipleTracks ? colors.secondary : colors.textSecondary,
                    opacity: hasMultipleTracks ? 1 : 0.5,
                  }}
                >
                  <SkipPreviousIcon fontSize="small" />
                </IconButton>

                <IconButton
                  onClick={togglePlay}
                  sx={{
                    width: 40,
                    height: 40,
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                    color: 'white',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.primary} 20%, ${colors.accent} 120%)`,
                    },
                  }}
                >
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>

                <IconButton
                  onClick={nextTrack}
                  size="small"
                  sx={{
                    color: hasMultipleTracks ? colors.secondary : colors.textSecondary,
                    opacity: hasMultipleTracks ? 1 : 0.5,
                  }}
                >
                  <SkipNextIcon fontSize="small" />
                </IconButton>
              </Stack>

              {/* Track indicator for multiple tracks */}
              {hasMultipleTracks && (
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.textSecondary,
                    textAlign: 'center',
                    display: 'block',
                    mt: 1,
                  }}
                >
                  {currentTrackIndex + 1} / {tracks.length}
                </Typography>
              )}
            </Box>
          </Collapse>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}
