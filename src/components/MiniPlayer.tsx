'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  IconButton,
  Typography,
  Slider,
  Stack,
  Paper,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { motion, AnimatePresence } from 'motion/react';

import { useAudio } from '@/lib/AudioContext';
import { tracks } from '@/lib/tracks';
import { colors } from '@/theme/theme';
import {
  trackMiniplayerExpand,
  trackMiniplayerCollapse,
  trackLinkClick,
} from '@/lib/analytics';

export default function MiniPlayer() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    queue,
    shuffle,
    repeatMode,
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
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);

  const handleExpandToggle = () => {
    if (isExpanded) {
      trackMiniplayerCollapse(currentTrack.id);
      setShowTrackList(false);
    } else {
      trackMiniplayerExpand(currentTrack.id);
    }
    setIsExpanded(!isExpanded);
  };

  const handleSeek = (_: Event, value: number | number[]) => {
    seek(value as number);
  };

  const repeatIcon = repeatMode === 'one' ? <RepeatOneIcon fontSize="small" /> : <RepeatIcon fontSize="small" />;
  const repeatColor = repeatMode === 'off' ? colors.textSecondary : colors.primary;

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
          left: isDesktop ? 'auto' : 20,
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
            maxWidth: { xs: '100%', sm: 420 },
            marginLeft: { xs: 0, sm: 'auto' },
            minWidth: isExpanded
              ? { xs: '100%', sm: 360 }
              : { xs: 'auto', sm: 280 },
            transition: 'min-width 0.3s ease, width 0.3s ease',
          }}
        >
          {/* Collapsed View */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 1 }}>
            {/* Album Art */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isPlaying
                  ? { duration: 8, repeat: Infinity, ease: 'linear' }
                  : { duration: 0.3 }
              }
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
                  sizes="44px"
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

            {/* Track Title (collapsed) or spacer (expanded) */}
            {!isExpanded ? (
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
            ) : (
              <Box sx={{ flex: 1 }} />
            )}

            {/* Expand/Collapse Toggle */}
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
                sx={{ color: colors.textSecondary, display: 'block' }}
              >
                {currentTrack.artist}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: colors.textSecondary, display: 'block', mb: 1, fontSize: '0.65rem' }}
              >
                by{' '}
                <Box
                  component="a"
                  href={currentTrack.createdBy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackLinkClick(
                      currentTrack.createdBy.name,
                      currentTrack.createdBy.url,
                      0,
                      true
                    )
                  }
                  sx={{
                    color: colors.primary,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {currentTrack.createdBy.name}
                </Box>
              </Typography>

              {/* Progress Bar */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="caption"
                  sx={{ color: colors.textSecondary, fontSize: '0.65rem' }}
                >
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
                <Typography
                  variant="caption"
                  sx={{ color: colors.textSecondary, fontSize: '0.65rem' }}
                >
                  {formatTime(duration)}
                </Typography>
              </Stack>

              {/* Controls: Shuffle, Prev, Play, Next, Repeat */}
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                <IconButton onClick={toggleShuffle} size="small" sx={{ color: shuffle ? colors.primary : colors.textSecondary, '&:hover': { backgroundColor: `${colors.primary}22` } }}>
                  <ShuffleIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={prevTrack} size="small" sx={{ color: hasMultipleTracks ? colors.primary : colors.textSecondary, opacity: hasMultipleTracks ? 1 : 0.5, backgroundColor: `${colors.primary}22`, '&:hover': { backgroundColor: `${colors.primary}44` } }}>
                  <SkipPreviousIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={togglePlay} sx={{ width: 40, height: 40, background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`, color: 'white', '&:hover': { background: `linear-gradient(135deg, ${colors.primary} 20%, ${colors.accent} 120%)` } }}>
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton onClick={nextTrack} size="small" sx={{ color: hasMultipleTracks ? colors.primary : colors.textSecondary, opacity: hasMultipleTracks ? 1 : 0.5, backgroundColor: `${colors.primary}22`, '&:hover': { backgroundColor: `${colors.primary}44` } }}>
                  <SkipNextIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={cycleRepeat} size="small" sx={{ color: repeatColor, '&:hover': { backgroundColor: `${colors.primary}22` } }}>
                  {repeatIcon}
                </IconButton>
              </Stack>

              {/* Track count + queue toggle */}
              {hasMultipleTracks && (
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.5 }}>
                  <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                    {queue.indexOf(currentTrackIndex) + 1} / {tracks.length}
                  </Typography>
                  <IconButton onClick={() => setShowTrackList(!showTrackList)} size="small" sx={{ color: showTrackList ? colors.primary : colors.textSecondary, '&:hover': { backgroundColor: `${colors.primary}22` } }}>
                    <QueueMusicIcon fontSize="small" />
                  </IconButton>
                </Stack>
              )}

              {/* Track List / Queue */}
              <Collapse in={showTrackList}>
                <Box sx={{ mt: 1, maxHeight: 240, overflowY: 'auto', borderTop: `1px solid ${colors.primary}22`, '&::-webkit-scrollbar': { width: 4 }, '&::-webkit-scrollbar-thumb': { backgroundColor: `${colors.primary}44`, borderRadius: 2 } }}>
                  <List dense disablePadding>
                    {queue.map((trackIdx, queuePos) => {
                      const trk = tracks[trackIdx];
                      const isActive = trackIdx === currentTrackIndex;
                      const isTrackPlaying = isActive && isPlaying;
                      return (
                        <ListItemButton key={trk.id} onClick={() => selectTrack(trackIdx)} sx={{ py: 0.75, px: 1, borderRadius: 1, backgroundColor: isActive ? `${colors.primary}15` : 'transparent', '&:hover': { backgroundColor: `${colors.primary}22` } }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', mr: 0.5 }}>
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); moveTrackInQueue(queuePos, queuePos - 1); }} sx={{ p: 0, color: colors.textSecondary, visibility: queuePos === 0 ? 'hidden' : 'visible', '&:hover': { color: colors.primary } }}>
                              <KeyboardArrowUpIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); moveTrackInQueue(queuePos, queuePos + 1); }} sx={{ p: 0, color: colors.textSecondary, visibility: queuePos === queue.length - 1 ? 'hidden' : 'visible', '&:hover': { color: colors.primary } }}>
                              <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            {isTrackPlaying ? (
                              <Box sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                                  <MusicNoteIcon sx={{ fontSize: 16, color: colors.primary }} />
                                </motion.div>
                              </Box>
                            ) : (
                              <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: '0.7rem', width: 20, textAlign: 'center' }}>{queuePos + 1}</Typography>
                            )}
                          </ListItemIcon>
                          <ListItemText primary={trk.title} secondary={trk.artist} primaryTypographyProps={{ variant: 'body2', sx: { color: isActive ? colors.primary : 'white', fontWeight: isActive ? 700 : 400, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }} secondaryTypographyProps={{ variant: 'caption', sx: { color: colors.textSecondary, fontSize: '0.65rem' } }} />
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); selectTrack(trackIdx); }} sx={{ color: isTrackPlaying ? colors.primary : colors.textSecondary, '&:hover': { color: colors.primary } }}>
                            {isTrackPlaying ? <PauseIcon sx={{ fontSize: 16 }} /> : <PlayArrowIcon sx={{ fontSize: 16 }} />}
                          </IconButton>
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Box>
              </Collapse>
            </Box>
          </Collapse>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}
