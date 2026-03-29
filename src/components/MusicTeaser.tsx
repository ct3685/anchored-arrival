'use client';

import Link from 'next/link';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors, clipPaths } from '@/theme/theme';
import { tracks } from '@/lib/tracks';

export default function MusicTeaser() {
  const hasRealTracks = tracks.length > 0 && tracks[0].src !== '';

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
              Entrance Themes
            </Typography>

            {hasRealTracks ? (
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  p: 3,
                  backgroundColor: colors.darkLeather,
                  clipPath: clipPaths.clippedCorner,
                  border: `1px solid ${colors.brass}33`,
                }}
              >
                <Typography variant="h5" sx={{ color: colors.amber, mb: 1 }}>
                  {tracks[0].title}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.dust }}>
                  {tracks[0].artist}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  p: 4,
                  backgroundColor: colors.darkLeather,
                  clipPath: clipPaths.clippedCorner,
                  border: `1px solid ${colors.brass}33`,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: colors.dust,
                    mb: 1,
                  }}
                >
                  Soundtrack Loading.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: colors.dust, opacity: 0.7 }}
                >
                  Entrance music and rally cries coming soon.
                </Typography>
              </Box>
            )}

            {/* Upcoming themed audio list */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 1 }}
            >
              {[
                'Live Intro',
                'Ranch Anthem',
                'Walkout Theme',
                'Chaos Interlude',
              ].map((track) => (
                <Box
                  key={track}
                  sx={{
                    px: 2,
                    py: 1,
                    border: `1px solid ${colors.brass}33`,
                    backgroundColor: `${colors.coalBrown}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.dust,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontSize: '0.7rem',
                    }}
                  >
                    {track}
                  </Typography>
                </Box>
              ))}
            </Stack>

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
                sx={{
                  clipPath: clipPaths.ticketStub,
                  border: 'none',
                  px: 5,
                  py: 1.5,
                  mt: 1,
                }}
              >
                Arena Sound
              </Button>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
