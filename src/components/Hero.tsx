'use client';

import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: { xs: '85vh', md: '100vh' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(238,218,210,0.6) 0%, rgba(201,150,123,0.12) 40%, rgba(245,237,227,0) 70%)',
        py: { xs: 8, md: 0 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: 220, sm: 280, md: 340 },
          height: { xs: 220, sm: 280, md: 340 },
          mb: { xs: 3, md: 4 },
        }}
      >
        <Image
          src="/logo.png"
          alt="Anchored Arrival — Grounded, Sacred, Becoming"
          fill
          sizes="(max-width: 600px) 220px, (max-width: 900px) 280px, 340px"
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>

      <Typography
        sx={{
          fontFamily: 'var(--font-body)',
          fontSize: { xs: '0.72rem', md: '0.82rem' },
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          mb: 2.5,
        }}
      >
        Grounded&ensp;&middot;&ensp;Sacred&ensp;&middot;&ensp;Becoming
      </Typography>

      <Typography
        sx={{
          fontFamily: 'var(--font-accent)',
          fontStyle: 'italic',
          fontSize: { xs: '1.15rem', sm: '1.35rem', md: '1.55rem' },
          fontWeight: 400,
          color: 'text.secondary',
          maxWidth: 520,
          px: 3,
          mb: 5,
          lineHeight: 1.6,
        }}
      >
        Compassionate doula care, birth education, and postpartum
        wellness&mdash;because no one should navigate this journey alone.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/contact"
        size="large"
        sx={{
          px: { xs: 5, md: 6 },
          py: 1.8,
          fontSize: '0.92rem',
        }}
      >
        Begin Your Journey
      </Button>
    </Box>
  );
}
