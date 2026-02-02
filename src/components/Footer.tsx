'use client';

import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import { colors } from '@/theme/theme';
import { trackSocialClick } from '@/lib/analytics';
import { useComingSoonToast } from '@/lib/useComingSoonToast';
import {
  TikTokIcon,
  YouTubeIcon,
  SnapchatIcon,
  InstagramIcon,
} from '@/components/Icons';

// Brand colors for social platforms
const socialColors = {
  tiktok: '#00F2EA',
  youtube: '#FF0000',
  snapchat: '#FFFC00',
  instagram: '#E1306C',
};

export default function Footer() {
  const { showToast, ComingSoonSnackbar } = useComingSoonToast();

  return (
    <>
      <Box
        component="footer"
        sx={{
          pt: 4,
          pb: 12,
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
              Agent Morgie © {new Date().getFullYear()}
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton
                href="https://www.tiktok.com/@realfeelpurpose"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('tiktok', 'footer')}
                sx={{
                  color: colors.textSecondary,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: socialColors.tiktok,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <TikTokIcon size={24} />
              </IconButton>
              <IconButton
                href="https://www.youtube.com/@AgentMorgan1000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('youtube', 'footer')}
                sx={{
                  color: colors.textSecondary,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: socialColors.youtube,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <YouTubeIcon size={24} />
              </IconButton>
              {/* Snapchat IconButton - Coming Soon */}
              <IconButton
                onClick={() => showToast()}
                sx={{
                  color: colors.textSecondary,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: socialColors.snapchat,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <SnapchatIcon size={24} />
              </IconButton>
              {/* Instagram IconButton */}
              <IconButton
                href="https://www.instagram.com/AgentMorgie"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('instagram', 'footer')}
                sx={{
                  color: colors.textSecondary,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: socialColors.instagram,
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <InstagramIcon size={24} />
              </IconButton>
            </Stack>

            {/* Developer credit */}
            <Box
              component="a"
              href="https://www.tiktok.com/@cam.tok"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick('tiktok_cam', 'footer')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: colors.textSecondary,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: socialColors.tiktok,
                },
              }}
            >
              <Typography variant="caption" sx={{ color: 'inherit' }}>
                Designed by Cam
              </Typography>
              <TikTokIcon size={14} />
            </Box>
          </Stack>
        </Container>
      </Box>
      <ComingSoonSnackbar />
    </>
  );
}
