'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { colors, clipPaths } from '@/theme/theme';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: colors.amber,
            fontSize: { xs: '4rem', md: '6rem' },
            mb: 2,
            textShadow: `0 0 40px ${colors.amber}33`,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h3"
          sx={{
            color: colors.bone,
            mb: 2,
            fontSize: { xs: '1.8rem', md: '2.4rem' },
          }}
        >
          Wrong Gate, Cowboy
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: colors.dust,
            mb: 5,
            maxWidth: 360,
          }}
        >
          This ain&apos;t the ranch. You took a bad turn somewhere.
        </Typography>

        <Stack spacing={2} alignItems="center">
          <Box
            sx={{
              width: '100%',
              maxWidth: 280,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${colors.brass}66, transparent)`,
              mb: 1,
            }}
          />

          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              py: 1.8,
              px: 5,
              fontSize: '1.05rem',
              clipPath: clipPaths.ticketStub,
              border: 'none',
            }}
          >
            Get Back to the Ranch
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
