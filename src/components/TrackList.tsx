'use client';

import Image from 'next/image';
import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { motion } from 'motion/react';

import { useAudio } from '@/lib/AudioContext';
import { tracks } from '@/lib/tracks';
import { colors, clipPaths } from '@/theme/theme';
import { useScrollDepth } from '@/lib/useScrollDepth';

export default function TrackList() {
  useScrollDepth();
  const {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    selectTrack,
    togglePlay,
    formatTime,
    currentTime,
    duration,
  } = useAudio();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        background: `linear-gradient(180deg, ${colors.smokeBlack} 0%, ${colors.coalBrown} 40%, ${colors.smokeBlack} 100%)`,
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack alignItems="center" spacing={1} sx={{ mb: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: colors.brass,
                letterSpacing: 6,
                fontSize: '0.8rem',
              }}
            >
              Rally Audio
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: colors.amber,
                textAlign: 'center',
                fontSize: { xs: '2.2rem', md: '3rem' },
              }}
            >
              Entrance Themes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.dust,
                textAlign: 'center',
                maxWidth: 500,
              }}
            >
              The soundtrack to the ranch. Click to play and vibe with us.
            </Typography>
          </Stack>
        </motion.div>

        {/* Now Playing - Arena Panel */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                mb: 4,
                p: 3,
                clipPath: clipPaths.clippedCorner,
                background: `linear-gradient(135deg, ${colors.darkLeather} 0%, ${colors.coalBrown} 100%)`,
                border: `1px solid ${colors.amber}44`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${colors.amber}, transparent)`,
                  animation: 'glow 2s ease-in-out infinite',
                },
                '@keyframes glow': {
                  '0%, 100%': { opacity: 0.5 },
                  '50%': { opacity: 1 },
                },
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <Box
                  sx={{
                    position: 'relative',
                    width: 80,
                    height: 80,
                    clipPath: clipPaths.buckleFrame,
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: `0 0 20px ${colors.amber}44`,
                  }}
                >
                  <Image
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: colors.red,
                      letterSpacing: 3,
                      fontSize: '0.65rem',
                      animation: 'flicker 3s ease-in-out infinite',
                      '@keyframes flicker': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0.7 },
                      },
                    }}
                  >
                    Now Playing
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: colors.bone, fontWeight: 700 }}
                  >
                    {currentTrack.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.dust }}>
                    {currentTrack.artist} &bull; {formatTime(currentTime)} /{' '}
                    {formatTime(duration)}
                  </Typography>
                  {/* Rugged progress bar */}
                  <Box
                    sx={{
                      mt: 1,
                      height: 4,
                      backgroundColor: `${colors.brass}33`,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                        background: `linear-gradient(90deg, ${colors.amber}, ${colors.red})`,
                        transition: 'width 0.3s linear',
                      }}
                    />
                  </Box>
                </Box>
                <IconButton
                  onClick={togglePlay}
                  sx={{
                    width: 56,
                    height: 56,
                    clipPath: clipPaths.buckleFrame,
                    background: `linear-gradient(135deg, ${colors.amber} 0%, ${colors.brass} 100%)`,
                    color: colors.smokeBlack,
                    borderRadius: 0,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.amber} 20%, ${colors.brass} 120%)`,
                    },
                  }}
                >
                  {isPlaying ? (
                    <PauseIcon fontSize="large" />
                  ) : (
                    <PlayArrowIcon fontSize="large" />
                  )}
                </IconButton>
              </Stack>
            </Box>
          </motion.div>
        )}

        {/* Track Cards - Metal Plate Style */}
        <Stack spacing={1.5}>
          {tracks.map((track, index) => {
            const isCurrentTrack = index === currentTrackIndex;
            const isTrackPlaying = isCurrentTrack && isPlaying;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Box
                  onClick={() => selectTrack(index)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    p: 2,
                    clipPath: clipPaths.clippedCornerSm,
                    cursor: 'pointer',
                    backgroundColor: isCurrentTrack
                      ? colors.darkLeather
                      : colors.coalBrown,
                    border: `1px solid ${isCurrentTrack ? colors.amber + '44' : colors.brass + '22'}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: colors.darkLeather,
                      boxShadow: `inset 0 0 20px ${colors.amber}08`,
                    },
                  }}
                >
                  {/* Album Art - Metal Plate Frame */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: 50,
                      height: 50,
                      clipPath: clipPaths.buckleFrame,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={track.cover}
                      alt={track.title}
                      fill
                      sizes="50px"
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>

                  {/* Track Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: isCurrentTrack ? colors.amber : colors.bone,
                        fontWeight: isCurrentTrack ? 700 : 500,
                        fontSize: '1rem',
                      }}
                    >
                      {track.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.dust }}>
                      {track.artist}
                    </Typography>
                  </Box>

                  {/* Play Button */}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      selectTrack(index);
                    }}
                    sx={{
                      color: isTrackPlaying ? colors.amber : colors.dust,
                      '&:hover': {
                        color: colors.amber,
                        backgroundColor: `${colors.amber}11`,
                      },
                    }}
                  >
                    {isTrackPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                  </IconButton>
                </Box>
              </motion.div>
            );
          })}
        </Stack>

        {/* Coming Soon */}
        {tracks.length <= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box
              sx={{
                mt: 4,
                p: 4,
                textAlign: 'center',
                clipPath: clipPaths.clippedCorner,
                backgroundColor: colors.darkLeather,
                border: `1px solid ${colors.brass}22`,
              }}
            >
              <Typography variant="h5" sx={{ color: colors.dust, mb: 1 }}>
                Soundtrack Loading.
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: colors.dust, opacity: 0.7 }}
              >
                Entrance music and rally cries coming soon.
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}
