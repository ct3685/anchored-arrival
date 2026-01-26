'use client';

import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { motion } from 'motion/react';
import MusicPlayer from './MusicPlayer';
import { colors } from '@/theme/theme';

// TikTok icon component
const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

interface LinkItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  color: string;
}

const links: LinkItem[] = [
  {
    label: 'TikTok @realfeelpurpose',
    href: 'https://www.tiktok.com/@realfeelpurpose',
    icon: <TikTokIcon />,
    color: colors.primary,
  },
  {
    label: 'View Gallery',
    href: '/gallery',
    color: colors.secondary,
  },
];

export default function LinkTree() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        background: `radial-gradient(ellipse at top, ${colors.surface} 0%, ${colors.background} 60%)`,
      }}
    >
      <Container maxWidth="sm">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
            {/* Avatar */}
            <Box
              sx={{
                position: 'relative',
                width: 120,
                height: 120,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -3,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                  animation: 'spin 4s linear infinite',
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
                  border: `3px solid ${colors.background}`,
                }}
              >
                <Image
                  src="/images/mvp.png"
                  alt="Agent Morgie"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Agent Morgie
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.textSecondary, textAlign: 'center' }}
            >
              Double O Badass • TikTok Live Creator
            </Typography>
          </Stack>
        </motion.div>

        {/* Links */}
        <Stack spacing={2} sx={{ mb: 4 }}>
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            >
              <Button
                fullWidth
                variant="outlined"
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                startIcon={link.icon}
                sx={{
                  py: 2,
                  px: 3,
                  borderColor: `${link.color}66`,
                  color: 'white',
                  backgroundColor: `${link.color}11`,
                  justifyContent: 'flex-start',
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: link.color,
                    backgroundColor: `${link.color}22`,
                    transform: 'translateX(8px)',
                    boxShadow: `0 0 20px ${link.color}44`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {link.label}
              </Button>
            </motion.div>
          ))}
        </Stack>

        {/* Music Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: colors.gold,
              textAlign: 'center',
            }}
          >
            🎵 Now Playing
          </Typography>
          <MusicPlayer />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
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
            "Live... And Lethal - Morgie&apos;s On a Mission!"
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
