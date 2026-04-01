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
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
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
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import BarChartIcon from '@mui/icons-material/BarChart';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { motion, AnimatePresence } from 'motion/react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';

import { useAudio, type SortMode, type FilterValue } from '@/lib/AudioContext';
import { tracks, CATEGORY_LABELS } from '@/lib/tracks';
import { colors } from '@/theme/theme';
import {
  trackMiniplayerExpand,
  trackMiniplayerCollapse,
  trackLinkClick,
} from '@/lib/analytics';
import { formatPlayCount } from '@/lib/usePlayCounts';

function SortableMiniQueueItem({
  trackIndex,
  queuePos,
  isDndEnabled,
}: {
  trackIndex: number;
  queuePos: number;
  isDndEnabled: boolean;
}) {
  const { currentTrackIndex, isPlaying, selectTrack } = useAudio();
  const trk = tracks[trackIndex];
  const isActive = trackIndex === currentTrackIndex;
  const isTrackPlaying = isActive && isPlaying;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: trk.id, disabled: !isDndEnabled });

  return (
    <div
      ref={setNodeRef}
      {...(isDndEnabled ? { ...attributes, ...listeners } : {})}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 0,
        position: 'relative',
        touchAction: isDndEnabled ? 'none' : undefined,
      }}
    >
      <ListItemButton
        onClick={() => selectTrack(trackIndex)}
        sx={{
          py: 0.75,
          px: 1,
          borderRadius: 1,
          cursor: isDndEnabled ? 'grab' : 'pointer',
          backgroundColor: isActive ? `${colors.primary}15` : 'transparent',
          '&:hover': { backgroundColor: `${colors.primary}22` },
          '&:active': isDndEnabled ? { cursor: 'grabbing' } : {},
        }}
      >
        {isDndEnabled && (
          <DragIndicatorIcon
            sx={{ fontSize: 16, color: colors.textSecondary, flexShrink: 0, mr: 0.5 }}
          />
        )}
        <ListItemIcon sx={{ minWidth: 32 }}>
          {isTrackPlaying ? (
            <Box
              sx={{
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <MusicNoteIcon sx={{ fontSize: 16, color: colors.primary }} />
              </motion.div>
            </Box>
          ) : (
            <Typography
              variant="caption"
              sx={{
                color: colors.textSecondary,
                fontSize: '0.7rem',
                width: 20,
                textAlign: 'center',
              }}
            >
              {queuePos + 1}
            </Typography>
          )}
        </ListItemIcon>
        <ListItemText
          primary={trk.title}
          secondary={trk.artist}
          primaryTypographyProps={{
            variant: 'body2',
            sx: {
              color: isActive ? colors.primary : 'white',
              fontWeight: isActive ? 700 : 400,
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
          secondaryTypographyProps={{
            variant: 'caption',
            sx: { color: colors.textSecondary, fontSize: '0.65rem' },
          }}
        />
        <IconButton
          size="small"
          aria-label={isTrackPlaying ? 'Pause' : 'Play'}
          onClick={(e) => {
            e.stopPropagation();
            selectTrack(trackIndex);
          }}
          sx={{
            color: isTrackPlaying ? colors.primary : colors.textSecondary,
            '&:hover': { color: colors.primary },
          }}
        >
          {isTrackPlaying ? (
            <PauseIcon sx={{ fontSize: 16 }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 16 }} />
          )}
        </IconButton>
      </ListItemButton>
    </div>
  );
}

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
    visibleQueue,
    shuffle,
    repeatMode,
    filter,
    setFilter,
    sortMode,
    setSortMode,
    playCounts,
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

  const isDndEnabled = sortMode === 'default';
  const sortGroup = sortMode === 'default' ? 'default' : sortMode.startsWith('name') ? 'name' : 'plays';

  const handleSortClick = (group: string) => {
    if (group === 'default') {
      setSortMode('default');
    } else if (group === 'name') {
      setSortMode(sortMode === 'name-asc' ? 'name-desc' : 'name-asc');
    } else {
      setSortMode(sortMode === 'plays-desc' ? 'plays-asc' : 'plays-desc');
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (!isDndEnabled) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = queue.findIndex((idx) => tracks[idx].id === active.id);
    const newIndex = queue.findIndex((idx) => tracks[idx].id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      moveTrackInQueue(oldIndex, newIndex);
    }
  };

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

  const repeatIcon =
    repeatMode === 'one' ? (
      <RepeatOneIcon fontSize="small" />
    ) : (
      <RepeatIcon fontSize="small" />
    );
  const repeatColor =
    repeatMode === 'off' ? colors.textSecondary : colors.primary;

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
              aria-label={isPlaying ? 'Pause' : 'Play'}
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
              aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
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
                sx={{
                  color: colors.textSecondary,
                  display: 'block',
                  mb: 1,
                  fontSize: '0.65rem',
                }}
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
                {(playCounts[currentTrack.id] ?? 0) > 0 && (
                  <>
                    {' · '}
                    {formatPlayCount(playCounts[currentTrack.id])}{' '}
                    {playCounts[currentTrack.id] === 1 ? 'play' : 'plays'}
                  </>
                )}
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

              {/* Controls */}
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                sx={{ mt: 1 }}
              >
                <IconButton
                  onClick={toggleShuffle}
                  aria-label="Toggle shuffle"
                  size="small"
                  sx={{
                    color: shuffle ? colors.primary : colors.textSecondary,
                    '&:hover': { backgroundColor: `${colors.primary}22` },
                  }}
                >
                  <ShuffleIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={prevTrack}
                  aria-label="Previous track"
                  size="small"
                  sx={{
                    color: hasMultipleTracks
                      ? colors.primary
                      : colors.textSecondary,
                    opacity: hasMultipleTracks ? 1 : 0.5,
                    backgroundColor: `${colors.primary}22`,
                    '&:hover': { backgroundColor: `${colors.primary}44` },
                  }}
                >
                  <SkipPreviousIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
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
                  aria-label="Next track"
                  size="small"
                  sx={{
                    color: hasMultipleTracks
                      ? colors.primary
                      : colors.textSecondary,
                    opacity: hasMultipleTracks ? 1 : 0.5,
                    backgroundColor: `${colors.primary}22`,
                    '&:hover': { backgroundColor: `${colors.primary}44` },
                  }}
                >
                  <SkipNextIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={cycleRepeat}
                  aria-label="Cycle repeat mode"
                  size="small"
                  sx={{
                    color: repeatColor,
                    '&:hover': { backgroundColor: `${colors.primary}22` },
                  }}
                >
                  {repeatIcon}
                </IconButton>
              </Stack>

              {/* Track count + queue toggle */}
              {hasMultipleTracks && (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 1.5 }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: colors.textSecondary }}
                  >
                    {visibleQueue.includes(currentTrackIndex)
                      ? `${visibleQueue.indexOf(currentTrackIndex) + 1} / ${visibleQueue.length}`
                      : `${visibleQueue.length} tracks`}
                  </Typography>
                  <IconButton
                    onClick={() => setShowTrackList(!showTrackList)}
                    aria-label={showTrackList ? 'Hide queue' : 'Show queue'}
                    size="small"
                    sx={{
                      color: showTrackList
                        ? colors.primary
                        : colors.textSecondary,
                      '&:hover': { backgroundColor: `${colors.primary}22` },
                    }}
                  >
                    <QueueMusicIcon fontSize="small" />
                  </IconButton>
                </Stack>
              )}

              {/* Track List / Queue */}
              <Collapse in={showTrackList}>
                {/* Category filter tabs */}
                <Tabs
                  value={filter}
                  onChange={(_, v) => setFilter(v as FilterValue)}
                  variant="fullWidth"
                  sx={{
                    minHeight: 28,
                    mt: 1,
                    '& .MuiTabs-indicator': {
                      backgroundColor: colors.primary,
                      height: 2,
                    },
                    '& .MuiTab-root': {
                      color: colors.textSecondary,
                      minHeight: 28,
                      py: 0,
                      fontSize: '0.65rem',
                      letterSpacing: 1,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      '&.Mui-selected': { color: colors.primary },
                    },
                  }}
                >
                  <Tab label="All" value="all" />
                  <Tab label={CATEGORY_LABELS.track} value="track" />
                  <Tab label={CATEGORY_LABELS.diss} value="diss" />
                </Tabs>

                {/* Sort controls */}
                <Stack alignItems="center" sx={{ mt: 1 }}>
                  <ToggleButtonGroup
                    value={sortGroup}
                    exclusive
                    onChange={(_, v) => { if (v !== null) handleSortClick(v); }}
                    size="small"
                    sx={{
                      '& .MuiToggleButton-root': {
                        color: colors.textSecondary,
                        borderColor: `${colors.primary}22`,
                        px: 1.5,
                        py: 0.25,
                        fontSize: '0.6rem',
                        letterSpacing: 0.5,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        '&.Mui-selected': {
                          color: colors.primary,
                          backgroundColor: `${colors.primary}15`,
                          borderColor: `${colors.primary}44`,
                          '&:hover': {
                            backgroundColor: `${colors.primary}22`,
                          },
                        },
                        '&:hover': {
                          backgroundColor: `${colors.primary}11`,
                        },
                      },
                    }}
                  >
                    <ToggleButton value="default">
                      <SwapVertIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      Default
                    </ToggleButton>
                    <ToggleButton
                      value="name"
                      onClick={() => { if (sortGroup === 'name') handleSortClick('name'); }}
                    >
                      <SortByAlphaIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      Name
                      {sortGroup === 'name' && (
                        sortMode === 'name-asc'
                          ? <ArrowUpwardIcon sx={{ fontSize: 12, ml: 0.5 }} />
                          : <ArrowDownwardIcon sx={{ fontSize: 12, ml: 0.5 }} />
                      )}
                    </ToggleButton>
                    <ToggleButton
                      value="plays"
                      onClick={() => { if (sortGroup === 'plays') handleSortClick('plays'); }}
                    >
                      <BarChartIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      Plays
                      {sortGroup === 'plays' && (
                        sortMode === 'plays-desc'
                          ? <ArrowDownwardIcon sx={{ fontSize: 12, ml: 0.5 }} />
                          : <ArrowUpwardIcon sx={{ fontSize: 12, ml: 0.5 }} />
                      )}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>

                <Box
                  sx={{
                    mt: 1,
                    maxHeight: 240,
                    overflowY: 'auto',
                    borderTop: `1px solid ${colors.primary}22`,
                    '&::-webkit-scrollbar': { width: 4 },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: `${colors.primary}44`,
                      borderRadius: 2,
                    },
                  }}
                >
                  <DndContext
                    id="miniplayer-dnd"
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[
                      restrictToVerticalAxis,
                      restrictToParentElement,
                    ]}
                  >
                    <SortableContext
                      items={visibleQueue.map((idx) => tracks[idx].id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <List dense disablePadding>
                        {visibleQueue.map((trackIdx, queuePos) => (
                          <SortableMiniQueueItem
                            key={tracks[trackIdx].id}
                            trackIndex={trackIdx}
                            queuePos={queuePos}
                            isDndEnabled={isDndEnabled}
                          />
                        ))}
                      </List>
                    </SortableContext>
                  </DndContext>
                </Box>
              </Collapse>
            </Box>
          </Collapse>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}
