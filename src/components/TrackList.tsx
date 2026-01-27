'use client';

import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { motion } from 'motion/react';

import { useAudio } from '@/lib/AudioContext';
import { tracks } from '@/lib/tracks';
import { colors } from '@/theme/theme';

export default function TrackList() {
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
        background: `radial-gradient(ellipse at top, ${colors.surface} 0%, ${colors.background} 60%)`,
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack alignItems="center" spacing={2} sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
              }}
            >
              Music
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.textSecondary,
                textAlign: 'center',
                maxWidth: 500,
              }}
            >
              Original tracks from Agent Morgie 00BA. Click to play and vibe
              with us.
            </Typography>
          </Stack>
        </motion.div>

        {/* Now Playing Card */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                p: 3,
                background: `linear-gradient(135deg, ${colors.primary}22 0%, ${colors.secondary}22 100%)`,
                border: `1px solid ${colors.primary}44`,
                borderRadius: 3,
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      boxShadow: `0 0 20px ${colors.primary}66`,
                    }}
                  >
                    <Image
                      src={currentTrack.cover}
                      alt={currentTrack.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                </motion.div>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="overline" sx={{ color: colors.gold }}>
                    Now Playing
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: 'white', fontWeight: 700 }}
                  >
                    {currentTrack.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: colors.textSecondary }}
                  >
                    {currentTrack.artist} • {formatTime(currentTime)} /{' '}
                    {formatTime(duration)}
                  </Typography>
                </Box>
                <IconButton
                  onClick={togglePlay}
                  sx={{
                    width: 56,
                    height: 56,
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                    color: 'white',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.primary} 20%, ${colors.accent} 120%)`,
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
            </Paper>
          </motion.div>
        )}

        {/* Track Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
              border: `1px solid ${colors.primary}33`,
              borderRadius: 3,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: colors.textSecondary,
                      borderColor: colors.primary + '33',
                      width: 60,
                    }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.textSecondary,
                      borderColor: colors.primary + '33',
                    }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.textSecondary,
                      borderColor: colors.primary + '33',
                    }}
                  >
                    Artist
                  </TableCell>
                  <TableCell
                    sx={{
                      color: colors.textSecondary,
                      borderColor: colors.primary + '33',
                      width: 80,
                    }}
                    align="right"
                  >
                    Play
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tracks.map((track, index) => {
                  const isCurrentTrack = index === currentTrackIndex;
                  const isTrackPlaying = isCurrentTrack && isPlaying;

                  return (
                    <TableRow
                      key={track.id}
                      onClick={() => selectTrack(index)}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: isCurrentTrack
                          ? `${colors.primary}11`
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: `${colors.primary}22`,
                        },
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <TableCell sx={{ borderColor: colors.primary + '22' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              position: 'relative',
                              width: 40,
                              height: 40,
                              borderRadius: 1,
                              overflow: 'hidden',
                            }}
                          >
                            <Image
                              src={track.cover}
                              alt={track.title}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ borderColor: colors.primary + '22' }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: isCurrentTrack ? colors.primary : 'white',
                            fontWeight: isCurrentTrack ? 700 : 500,
                          }}
                        >
                          {track.title}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderColor: colors.primary + '22' }}>
                        <Typography
                          variant="body2"
                          sx={{ color: colors.textSecondary }}
                        >
                          {track.artist}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ borderColor: colors.primary + '22' }}
                        align="right"
                      >
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            selectTrack(index);
                          }}
                          sx={{
                            color: isTrackPlaying
                              ? colors.primary
                              : colors.textSecondary,
                            '&:hover': {
                              color: colors.primary,
                              backgroundColor: `${colors.primary}22`,
                            },
                          }}
                        >
                          {isTrackPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>

        {/* Empty State / Coming Soon */}
        {tracks.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                textAlign: 'center',
                color: colors.textSecondary,
                fontStyle: 'italic',
              }}
            >
              More tracks coming soon... Stay tuned!
            </Typography>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}
