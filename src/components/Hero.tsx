'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors } from '@/theme/theme';

export default function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `radial-gradient(ellipse at center, ${colors.surface} 0%, ${colors.background} 70%)`,
        overflow: 'hidden',
      }}
    >
      {/* Gradient orbs background */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary}33 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.secondary}33 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems="center"
          justifyContent="center"
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 280, md: 350 },
                height: { xs: 280, md: 350 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                  animation: 'spin 6s linear infinite',
                },
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `4px solid ${colors.background}`,
                }}
              >
                <Image
                  src="/images/main-character.png"
                  alt="Agent Morgie"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Box>
            </Box>
          </motion.div>

          {/* Text Content */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 500 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: colors.secondary,
                  letterSpacing: 4,
                  fontWeight: 600,
                  mb: 1,
                  display: 'block',
                }}
              >
                WELCOME TO THE WORLD OF
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
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  lineHeight: 1.1,
                }}
              >
                Agent Morgie
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  color: colors.gold,
                  mb: 2,
                }}
              >
                00BA
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: colors.textSecondary,
                  fontWeight: 400,
                  mb: 2,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                }}
              >
                Double O Badass • Main Character Energy • Live... And Lethal
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: colors.textSecondary,
                  fontWeight: 400,
                  mb: 4,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  lineHeight: 1.7,
                  maxWidth: 450,
                }}
              >
                Candid, community-driven creator focused on real conversations, growth, and connection. TikTok Lives, relatable humor, mindset/faith moments, and everyday lifestyle—building a welcoming space where people can be genuine, have fun, and feel at home.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={Link}
                  href="/gallery"
                >
                  View Gallery
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  href="https://www.tiktok.com/@realfeelpurpose"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on TikTok
                </Button>
              </Stack>
            </motion.div>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
