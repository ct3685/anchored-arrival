'use client';

import Image from 'next/image';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors, clipPaths, layout } from '@/theme/theme';
import { trackHeroCTA, trackOutboundClick } from '@/lib/analytics';
import { useScrollDepth } from '@/lib/useScrollDepth';
import { useLiveStatus } from '@/lib/useLiveStatus';

export default function Hero() {
  useScrollDepth();
  const { isLive, tiktokHref } = useLiveStatus();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: {
          xs: `calc(100dvh - ${layout.navbarHeight.xs}px)`,
          sm: `calc(100dvh - ${layout.navbarHeight.sm}px)`,
        },
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(180deg, ${colors.smokeBlack} 0%, ${colors.coalBrown} 40%, ${colors.smokeBlack} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Arena haze / stage light effects — intensify when live */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          top: '-10%',
          left: '20%',
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${colors.red}${isLive ? '30' : '18'} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          transition: 'background 1s ease',
        }}
      />
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${colors.amber}${isLive ? '28' : '14'} 0%, transparent 70%)`,
          filter: 'blur(100px)',
          transition: 'background 1s ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '30%',
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${colors.turquoise}08 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: { xs: 4, sm: 5, md: 8 },
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Text Content - Left Side */}
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: 560,
              flex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: isLive ? colors.red : colors.brass,
                  letterSpacing: 6,
                  fontWeight: 600,
                  mb: 1,
                  display: 'block',
                  fontSize: '0.85rem',
                  ...(isLive && {
                    animation: 'flicker 2s ease-in-out infinite',
                    '@keyframes flicker': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.6 },
                    },
                  }),
                }}
              >
                {isLive ? '🔴 Live Right Now' : 'Tonight at the Ranch'}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3.5rem', sm: '5rem', md: '6rem' },
                  color: colors.amber,
                  mb: 2,
                  textShadow: isLive
                    ? `0 0 60px ${colors.red}44, 0 0 30px ${colors.amber}33`
                    : `0 0 40px ${colors.amber}33`,
                  transition: 'text-shadow 1s ease',
                }}
              >
                {isLive ? (
                  <>
                    The Ranch
                    <br />
                    Is Live
                  </>
                ) : (
                  <>
                    Com&apos;On.
                    <br />
                    Pull Up.
                  </>
                )}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: colors.dust,
                  fontWeight: 400,
                  mb: 5,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  maxWidth: 420,
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                {isLive
                  ? "Trevor is LIVE right now on TikTok. The ranch is open. Pull up — you're missing it."
                  : 'Country-fried live chaos, rally cries, and real ones only. Pull up for the live. Stay for the madness.'}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  variant="contained"
                  color={isLive ? 'secondary' : 'primary'}
                  size="large"
                  href={tiktokHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackHeroCTA(
                      isLive ? 'Watch Live Now' : 'Join the Ranch',
                      tiktokHref,
                      true
                    );
                    trackOutboundClick(
                      tiktokHref,
                      isLive ? 'Watch Live Now' : 'Join the Ranch',
                      'hero'
                    );
                  }}
                  sx={{
                    py: 1.8,
                    px: 5,
                    fontSize: '1.05rem',
                    clipPath: clipPaths.ticketStub,
                    border: 'none',
                    ...(isLive && {
                      animation: 'livePulse 2s ease-in-out infinite',
                      '@keyframes livePulse': {
                        '0%, 100%': {
                          boxShadow: `0 0 20px ${colors.red}44`,
                        },
                        '50%': {
                          boxShadow: `0 0 30px ${colors.red}88`,
                        },
                      },
                    }),
                  }}
                >
                  {isLive ? '🔴 Watch Now' : 'Join the Ranch'}
                </Button>
                <Button
                  variant="contained"
                  color={isLive ? 'primary' : 'secondary'}
                  size="large"
                  href="https://kingstreetcowboys.com/affiliates/trevorbfit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackHeroCTA(
                      'Shop the Gear',
                      'https://kingstreetcowboys.com/affiliates/trevorbfit',
                      true
                    );
                    trackOutboundClick(
                      'https://kingstreetcowboys.com/affiliates/trevorbfit',
                      'Shop the Gear',
                      'hero'
                    );
                  }}
                  sx={{
                    py: 1.8,
                    px: 5,
                    fontSize: '1.05rem',
                    clipPath: clipPaths.ticketStub,
                    border: 'none',
                  }}
                >
                  Shop the Gear
                </Button>
              </Stack>
            </motion.div>
          </Box>

          {/* Portrait - Right Side - Buckle-plate frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 280, sm: 320, md: 380 },
                height: { xs: 340, sm: 390, md: 460 },
              }}
            >
              {/* Outer glow — red pulse when live */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: -8,
                  clipPath: clipPaths.buckleFrame,
                  background: isLive
                    ? `linear-gradient(135deg, ${colors.red}88, ${colors.amber}66, ${colors.red}88)`
                    : `linear-gradient(135deg, ${colors.amber}66, ${colors.red}44, ${colors.turquoise}33)`,
                  filter: 'blur(2px)',
                  transition: 'background 1s ease',
                  ...(isLive && {
                    animation: 'frameGlow 2s ease-in-out infinite',
                    '@keyframes frameGlow': {
                      '0%, 100%': { opacity: 0.8 },
                      '50%': { opacity: 1 },
                    },
                  }),
                }}
              />
              {/* Brass border */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: -3,
                  clipPath: clipPaths.buckleFrame,
                  background: `linear-gradient(135deg, ${colors.brass}, ${colors.amber}, ${colors.brass})`,
                }}
              />
              {/* Image container */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  clipPath: clipPaths.buckleFrame,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/images/trevor-horseback-portrait.jpeg"
                  alt="Trevor on horseback - Ranch Squad"
                  fill
                  sizes="(max-width: 768px) 280px, 380px"
                  style={{ objectFit: 'cover' }}
                  priority
                  fetchPriority="high"
                />
                {/* Vignette overlay on portrait */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, ${colors.smokeBlack}88 0%, transparent 40%)`,
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}
