'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, Typography, Button, Stack, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { motion } from 'motion/react';
import { colors, clipPaths } from '@/theme/theme';
import { trackTeaserCTA } from '@/lib/analytics';
import { tracks } from '@/lib/tracks';
import { useAudio } from '@/lib/AudioContext';

function EqBars() {
  return (
    <Stack
      direction="row"
      spacing="2px"
      alignItems="flex-end"
      sx={{ height: 16 }}
    >
      {[0, 0.15, 0.3].map((delay, i) => (
        <Box
          key={i}
          sx={{
            width: 3,
            backgroundColor: colors.amber,
            borderRadius: '1px',
            animation: 'eqBounce 0.8s ease-in-out infinite alternate',
            animationDelay: `${delay}s`,
            '@keyframes eqBounce': {
              '0%': { height: 4 },
              '100%': { height: 16 },
            },
          }}
        />
      ))}
    </Stack>
  );
}

function SmallTrackCard({ trackIndex }: { trackIndex: number }) {
  const { currentTrackIndex, isPlaying, selectTrack } = useAudio();
  const track = tracks[trackIndex];
  const isActive = trackIndex === currentTrackIndex && isPlaying;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: trackIndex * 0.1 }}
    >
      <Box
        onClick={() => selectTrack(trackIndex)}
        sx={{
          cursor: 'pointer',
          textAlign: 'center',
          width: { xs: 130, sm: 150 },
          transition: 'transform 0.2s ease',
          '&:hover': { transform: 'translateY(-4px)' },
          '&:hover .coverOverlay': { opacity: 1 },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: 130, sm: 150 },
            height: { xs: 130, sm: 150 },
            clipPath: clipPaths.buckleFrame,
            overflow: 'hidden',
            mb: 1.5,
          }}
        >
          <Image
            src={track.cover}
            alt={track.title}
            fill
            sizes="150px"
            style={{ objectFit: 'cover' }}
          />
          <Box
            className="coverOverlay"
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${colors.smokeBlack}88`,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            {isActive ? (
              <EqBars />
            ) : (
              <PlayArrowIcon sx={{ color: colors.bone, fontSize: 32 }} />
            )}
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: isActive ? colors.amber : colors.bone,
            fontWeight: 600,
            fontSize: '0.85rem',
            lineHeight: 1.3,
          }}
        >
          {track.title}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: colors.dust, fontSize: '0.7rem' }}
        >
          {track.artist}
        </Typography>
      </Box>
    </motion.div>
  );
}

export default function MusicTeaser() {
  const { currentTrackIndex, isPlaying, selectTrack } = useAudio();
  const featured = tracks[0];
  const isFeaturedActive = currentTrackIndex === 0 && isPlaying;

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        background: `linear-gradient(180deg, ${colors.coalBrown} 0%, ${colors.smokeBlack} 100%)`,
        borderTop: `1px solid ${colors.brass}22`,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Stack alignItems="center" spacing={3}>
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
                color: colors.bone,
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '2.8rem' },
              }}
            >
              The Soundtrack
            </Typography>

            {/* Featured track — hero card */}
            <Box
              onClick={() => selectTrack(0)}
              sx={{
                width: '100%',
                maxWidth: 520,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 2, sm: 3 },
                p: { xs: 2.5, sm: 3 },
                cursor: 'pointer',
                backgroundColor: colors.darkLeather,
                clipPath: clipPaths.clippedCorner,
                border: `1px solid ${isFeaturedActive ? colors.amber + '55' : colors.brass + '33'}`,
                transition: 'border-color 0.3s ease',
                '&:hover': {
                  borderColor: colors.amber + '66',
                },
                '&:hover .featuredOverlay': { opacity: 1 },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 160, sm: 140 },
                  height: { xs: 160, sm: 140 },
                  clipPath: clipPaths.buckleFrame,
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: isFeaturedActive
                    ? `0 0 24px ${colors.amber}44`
                    : 'none',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 600px) 160px, 140px"
                  style={{ objectFit: 'cover' }}
                />
                <Box
                  className="featuredOverlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: `${colors.smokeBlack}77`,
                    opacity: isFeaturedActive ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {isFeaturedActive ? (
                    <EqBars />
                  ) : (
                    <PlayArrowIcon sx={{ color: colors.bone, fontSize: 40 }} />
                  )}
                </Box>
              </Box>

              <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flex: 1, minWidth: 0 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: isFeaturedActive ? colors.red : colors.brass,
                    letterSpacing: 3,
                    fontSize: '0.6rem',
                    ...(isFeaturedActive && {
                      animation: 'flicker 3s ease-in-out infinite',
                      '@keyframes flicker': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0.7 },
                      },
                    }),
                  }}
                >
                  {isFeaturedActive ? 'Now Playing' : 'Latest Track'}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: isFeaturedActive ? colors.amber : colors.bone,
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  {featured.title}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.dust }}>
                  {featured.artist}
                </Typography>
                <IconButton
                  aria-label={isFeaturedActive ? 'Pause' : 'Play'}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectTrack(0);
                  }}
                  sx={{
                    mt: 1.5,
                    width: 44,
                    height: 44,
                    clipPath: clipPaths.buckleFrame,
                    background: `linear-gradient(135deg, ${colors.amber} 0%, ${colors.brass} 100%)`,
                    color: colors.smokeBlack,
                    borderRadius: 0,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.amber} 20%, ${colors.brass} 120%)`,
                    },
                  }}
                >
                  {isFeaturedActive ? (
                    <PauseIcon fontSize="medium" />
                  ) : (
                    <PlayArrowIcon fontSize="medium" />
                  )}
                </IconButton>
              </Box>
            </Box>

            {/* Supporting tracks row */}
            <Stack
              direction="row"
              spacing={{ xs: 2, sm: 3 }}
              justifyContent="center"
              sx={{
                mt: 1,
                overflowX: 'auto',
                width: '100%',
                pb: 1,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {tracks.slice(1, 4).map((_, i) => (
                <SmallTrackCard key={tracks[i + 1].id} trackIndex={i + 1} />
              ))}
            </Stack>

            {/* Catalog depth */}
            <Typography
              variant="body2"
              sx={{
                color: colors.dust,
                textAlign: 'center',
                letterSpacing: '0.04em',
                mt: 1,
              }}
            >
              {tracks.length} tracks and counting
            </Typography>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                component={Link}
                href="/music"
                variant="contained"
                color="primary"
                onClick={() =>
                  trackTeaserCTA('Hear the Full Soundtrack', '/music')
                }
                sx={{
                  clipPath: clipPaths.ticketStub,
                  border: 'none',
                  px: 5,
                  py: 1.5,
                }}
              >
                Hear the Full Soundtrack
              </Button>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
