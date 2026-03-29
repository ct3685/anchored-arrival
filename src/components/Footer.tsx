'use client';

import { Box, Container, Typography, Stack } from '@mui/material';
import { colors } from '@/theme/theme';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pt: 6,
        pb: 14,
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
        <Stack alignItems="center" spacing={3}>
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
              background: `linear-gradient(90deg, ${colors.brass}44, ${colors.amber}, ${colors.brass}44)`,
            }}
          />

          <Typography
            variant="caption"
            sx={{
              color: colors.dust,
              letterSpacing: '0.06em',
              opacity: 0.6,
            }}
          >
            &copy; {new Date().getFullYear()} Ranch Squad &mdash; Real Ones Only
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
