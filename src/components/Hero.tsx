'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { colors } from '@/theme/theme';

export default function Hero() {
  return (
    <Box
      component="section"
      aria-label="Introduction"
      sx={{
        minHeight: { xs: 'auto', md: 'min(100vh, 920px)' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(0, 0.85fr)' },
        alignItems: 'stretch',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 3, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
      {/* Editorial column */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, sm: 5, md: 8, lg: 10 },
          py: { xs: 6, md: 10 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          className="aa-fade-up"
          sx={{
            fontFamily: 'var(--font-sans)',
            fontSize: { xs: '0.68rem', sm: '0.72rem' },
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: colors.bronzeMuted,
            mb: { xs: 3, md: 4 },
            fontWeight: 600,
          }}
        >
          Alissa Thorson · Doula practice
        </Typography>

        <Typography
          variant="h1"
          className="aa-fade-up aa-fade-up-delay-1"
          sx={{
            fontFamily: 'var(--font-display)',
            fontSize: { xs: '2.65rem', sm: '3.35rem', md: 'clamp(3.25rem, 5.2vw, 4.75rem)' },
            fontWeight: 600,
            color: colors.espresso,
            maxWidth: { md: '12ch' },
            mb: { xs: 3, md: 4 },
            lineHeight: { xs: 1.05, md: 1.02 },
          }}
        >
          Hold steady.
          <Box
            component="span"
            sx={{
              display: 'block',
              mt: { xs: 0.5, md: 0.75 },
              color: colors.clayDeep,
              fontStyle: 'italic',
              fontFamily: 'var(--font-accent)',
              fontWeight: 500,
              fontSize: { xs: '0.92em', md: '0.9em' },
            }}
          >
            Arrive whole.
          </Box>
        </Typography>

        <Box
          className="aa-fade-up aa-fade-up-delay-2"
          sx={{
            width: { xs: 48, md: 64 },
            height: '2px',
            bgcolor: colors.clay,
            mb: { xs: 3, md: 4 },
            opacity: 0.85,
          }}
        />

        <Typography
          className="aa-fade-up aa-fade-up-delay-2"
          sx={{
            fontFamily: 'var(--font-sans)',
            fontSize: { xs: '1.05rem', md: '1.125rem' },
            fontWeight: 400,
            color: colors.warmGray,
            maxWidth: 440,
            lineHeight: 1.7,
            mb: { xs: 4, md: 5 },
          }}
        >
          Doula care, birth education, and postpartum support. I work slowly, with evidence, and
          without theater. For a crossing this heavy, you deserve someone who will not rush you.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          className="aa-fade-up aa-fade-up-delay-3"
          sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/contact"
            size="large"
            sx={{ minWidth: { sm: 200 } }}
          >
            Request a consultation
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href="#offerings"
            size="large"
            sx={{ minWidth: { sm: 200 } }}
          >
            View offerings
          </Button>
        </Stack>
      </Box>

      {/* Visual column — anchor still life, warm panel */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 300, md: 'auto' },
          bgcolor: { xs: 'rgba(232,222,210,0.45)', md: colors.sand },
          borderTop: { xs: `1px solid rgba(58,53,48,0.06)`, md: 'none' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          py: { xs: 5, md: 0 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: { xs: 0, md: 1 },
            background:
              'radial-gradient(ellipse 85% 65% at 60% 35%, rgba(201,150,123,0.18) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(212,201,168,0.2) 0%, transparent 42%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            width: { xs: 200, sm: 240, md: 'min(78%, 400px)' },
            aspectRatio: '3 / 4',
            zIndex: 1,
            '& img': {
              objectFit: 'contain',
              objectPosition: 'center',
            },
          }}
        >
          <Image
            src="/images/anchor-still-life.png"
            alt="Sculptural anchor in sand with soft fabric and warm light."
            fill
            sizes="(max-width: 600px) 240px, (max-width: 900px) 280px, 400px"
            priority
          />
        </Box>
        <Typography
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            bottom: 48,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: colors.warmGray,
            letterSpacing: '0.12em',
            textAlign: 'center',
            px: 2,
            opacity: 0.85,
          }}
          aria-hidden
        >
          Grounded · Sacred · Becoming
        </Typography>
      </Box>
    </Box>
  );
}
