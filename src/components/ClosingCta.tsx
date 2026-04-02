'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import { colors } from '@/theme/theme';

export default function ClosingCta() {
  return (
    <Box
      component="section"
      aria-labelledby="closing-cta-heading"
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(245,237,227,0.95) 0%, rgba(238,218,210,0.5) 50%, rgba(232,222,210,0.9) 100%)',
          zIndex: 0,
        }}
        aria-hidden
      />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Typography
          id="closing-cta-heading"
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: 'clamp(2.25rem, 4vw, 3.1rem)' },
            color: colors.espresso,
            mb: 3,
            fontWeight: 600,
            lineHeight: 1.15,
          }}
        >
          You are allowed to want beauty and rigor in the same breath.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
            fontSize: { xs: '1.1rem', md: '1.2rem' },
            color: colors.warmGray,
            lineHeight: 1.7,
            mb: 4,
            maxWidth: 520,
            mx: 'auto',
          }}
        >
          When you are ready, we will map a path that feels honest—then walk it at your pace.
        </Typography>
        <Button variant="contained" color="primary" component={Link} href="/contact" size="large" sx={{ px: 5 }}>
          Begin with a conversation
        </Button>
      </Container>
    </Box>
  );
}
