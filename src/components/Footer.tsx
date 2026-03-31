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
              sx={{
                color: colors.dust,
                letterSpacing: '0.06em',
                opacity: 0.6,
                textAlign: 'center',
              }}
            >
              &copy; {new Date().getFullYear()} Ranch Squad &mdash; Real Ones
              Only
            </Typography>
            <Typography
              variant="caption"
              component="p"
              sx={{
                m: 0,
                color: colors.dust,
                letterSpacing: '0.06em',
                opacity: 0.55,
                textAlign: 'center',
              }}
            >
              Made by{' '}
              <Box component="span" sx={{ color: colors.amber, opacity: 1 }}>
                Reaper
              </Box>{' '}
              <MuiLink
                href="https://cam.tok"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  opacity: 1,
                  '&:hover': { opacity: 0.8 },
                }}
              >
                ⛰️
              </MuiLink>
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
