'use client';

import {
  Box,
  Container,
  Typography,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import { colors } from '@/theme/theme';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pt: 5,
        pb: 13,
        px: 2,
        mt: 'auto',
        backgroundColor: colors.smokeBlack,
        borderTop: `1px solid ${colors.brass}33`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${colors.amber}44 50%, transparent 100%)`,
        },
      }}
    >
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={2}>
          <Typography
            variant="h5"
            sx={{
              color: colors.amber,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            Trevor / Ranch Squad
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: colors.dust,
              textAlign: 'center',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
            }}
          >
            No Power Ups. Just Power.
          </Typography>

          <Box
            sx={{
              width: 60,
              height: 1,
              my: 0.5,
              background: `linear-gradient(90deg, ${colors.brass}44, ${colors.amber}, ${colors.brass}44)`,
            }}
          />

          <Stack alignItems="center" spacing={0.75}>
            <Typography
              variant="caption"
              suppressHydrationWarning
              sx={{
                color: colors.dust,
                letterSpacing: '0.06em',
                opacity: 0.6,
                textAlign: 'center',
              }}
            >
              © {new Date().getFullYear()} Ranch Squad — Real Ones Only
            </Typography>
            <MuiLink
              href="https://tiktok.com/@cam.tok"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: colors.amber,
                letterSpacing: '0.06em',
                opacity: 0.8,
                textAlign: 'center',
                fontSize: '0.75rem',
                transition: 'all 0.2s ease',
                '&:hover': {
                  opacity: 1,
                  color: colors.amber,
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  opacity: 1,
                  color: colors.amber,
                  transform: 'scale(1.05)',
                },
              }}
            >
              Made by Reaper ⛰️
            </MuiLink>
            <Typography
              variant="caption"
              component="p"
              sx={{
                m: 0,
                color: colors.amber,
                textAlign: 'center',
                letterSpacing: '0.05em',
                fontSize: '0.7rem',
              }}
            >
              Want to support Reaper?{' '}
              <MuiLink
                href="https://www.tiktok.com/coin?rc=ZE4A4SWN"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  transition: 'color 0.2s',
                  '&:hover': { color: colors.amber },
                }}
              >
                Recharge TikTok coins here 🎁
              </MuiLink>
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
