'use client';

import { useEffect } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { colors, clipPaths } from '@/theme/theme';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
            color: colors.red,
            fontSize: { xs: '3.5rem', md: '5rem' },
            mb: 2,
            textShadow: `0 0 40px ${colors.red}33`,
          }}
        >
          Whoa There
        </Typography>

        <Typography
          variant="h3"
          sx={{
            color: colors.bone,
            mb: 2,
            fontSize: { xs: '1.6rem', md: '2rem' },
          }}
        >
          Horse Threw a Shoe
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: colors.dust,
            mb: 5,
            maxWidth: 360,
          }}
        >
          Something went sideways. Give it another go.
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
            variant="contained"
            color="secondary"
            size="large"
            onClick={reset}
            sx={{
              py: 1.8,
              px: 5,
              fontSize: '1.05rem',
              clipPath: clipPaths.ticketStub,
              border: 'none',
            }}
          >
            Try Again
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
