'use client';

import { Box, Typography, Button, Container, Stack } from '@mui/material';
import Link from 'next/link';
import { colors } from '@/theme/theme';

export default function ClosingCta() {
  return (
    <Box
      component="section"
      aria-labelledby="closing-cta-heading"
      sx={{
        py: { xs: 10, md: 15 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(120deg, rgba(245,237,227,0.98) 0%, rgba(238,218,210,0.35) 42%, rgba(232,222,210,0.92) 100%)',
          zIndex: 0,
        }}
        aria-hidden
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: { xs: '12%', md: '18%' },
          left: { xs: '6%', md: '8%' },
          width: { xs: 1, md: 2 },
          height: { xs: 48, md: 72 },
          bgcolor: colors.clay,
          opacity: 0.35,
          zIndex: 0,
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            maxWidth: { md: 720 },
            mx: { xs: 0, md: 0 },
            textAlign: { xs: 'center', md: 'left' },
            pl: { md: 1 },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: colors.bronzeMuted,
              fontWeight: 600,
              mb: 2,
            }}
          >
            Next step
          </Typography>
          <Typography
            id="closing-cta-heading"
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: 'clamp(2.35rem, 4vw, 3.25rem)' },
              color: colors.espresso,
              mb: 2.5,
              fontWeight: 600,
              lineHeight: { xs: 1.14, md: 1.08 },
            }}
          >
            You are allowed to want beauty and rigor in the same breath.
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontSize: { xs: '1.08rem', md: '1.18rem' },
              color: colors.warmGray,
              lineHeight: 1.72,
              mb: { xs: 4, md: 5 },
              maxWidth: 540,
              mx: { xs: 'auto', md: 0 },
            }}
          >
            When you are ready, we map a path that feels honest—then walk it at your pace. No
            performance, no pressure to be &ldquo;ready&rdquo; before you are.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: { xs: 'center', md: 'flex-start' } }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/contact"
              size="large"
              sx={{ minWidth: { sm: 220 }, px: { xs: 4, sm: 5 } }}
            >
              Request a consultation
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              href="/services"
              size="large"
              sx={{ minWidth: { sm: 200 } }}
            >
              Read offerings first
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
