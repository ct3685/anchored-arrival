'use client';

import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import { colors } from '@/theme/theme';

// TikTok icon component (not in MUI icons)
const TikTokIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: colors.background,
        borderTop: `1px solid ${colors.primary}22`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="body2"
            sx={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}
          >
            Agent Morgie 00BA © {new Date().getFullYear()}
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              href="https://www.tiktok.com/@realfeelpurpose"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: colors.textSecondary,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: colors.primary,
                  transform: 'scale(1.1)',
                },
              }}
            >
              <TikTokIcon />
            </IconButton>
          </Stack>

          <Typography
            variant="caption"
            sx={{ color: colors.textSecondary }}
          >
            Double O Badass
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
