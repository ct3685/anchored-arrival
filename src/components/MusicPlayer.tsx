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
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from 'motion/react';

import { Track, featuredTrack } from '@/lib/tracks';
import { colors } from '@/theme/theme';

interface MusicPlayerProps {
  track?: Track;
  compact?: boolean;
}

export default function MusicPlayer({ track = featuredTrack, compact = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (_: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value as number;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = value as number;
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(track.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${track.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: compact ? 2 : 3,
        background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
        border: `1px solid ${colors.primary}33`,
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <audio ref={audioRef} src={track.src} preload="metadata" />

      <Stack
        direction={{ xs: 'column', sm: compact ? 'row' : 'column' }}
        spacing={2}
        alignItems="center"
      >
        {/* Album Art */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.5 }}
        >
          <Box
            sx={{
              position: 'relative',
              width: compact ? 80 : 200,
              height: compact ? 80 : 200,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: isPlaying
                ? `0 0 30px ${colors.primary}66, 0 0 60px ${colors.secondary}33`
                : `0 0 20px ${colors.primary}33`,
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <Image
              src={track.cover}
              alt={track.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </motion.div>

        {/* Controls */}
        <Box sx={{ flex: 1, width: '100%' }}>
          <Typography
            variant={compact ? 'body1' : 'h6'}
            sx={{
              fontWeight: 700,
              color: 'white',
              textAlign: compact ? 'left' : 'center',
              mb: 0.5,
            }}
          >
            {track.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: colors.textSecondary,
              textAlign: compact ? 'left' : 'center',
              mb: 2,
            }}
          >
            {track.artist}
          </Typography>

          {/* Progress Bar */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="caption" sx={{ color: colors.textSecondary, minWidth: 40 }}>
              {formatTime(currentTime)}
            </Typography>
            <Slider
              value={currentTime}
              max={duration || 100}
              onChange={handleSeek}
              sx={{
                color: colors.primary,
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0 0 10px ${colors.primary}`,
                  },
                },
                '& .MuiSlider-track': {
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                },
              }}
            />
            <Typography variant="caption" sx={{ color: colors.textSecondary, minWidth: 40 }}>
              {formatTime(duration)}
            </Typography>
          </Stack>

          {/* Playback Controls */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <IconButton
              onClick={toggleMute}
              sx={{ color: colors.textSecondary }}
            >
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <Slider
              value={isMuted ? 0 : volume}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
              sx={{
                width: 80,
                color: colors.secondary,
                '& .MuiSlider-thumb': {
                  width: 10,
                  height: 10,
                },
              }}
            />

            <IconButton
              onClick={togglePlay}
              sx={{
                mx: 2,
                width: 56,
                height: 56,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                color: 'white',
                '&:hover': {
                  background: `linear-gradient(135deg, ${colors.primary} 20%, ${colors.accent} 120%)`,
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
            </IconButton>

            <IconButton
              onClick={handleDownload}
              sx={{
                color: colors.secondary,
                '&:hover': {
                  color: colors.primary,
                },
              }}
            >
              <DownloadIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
