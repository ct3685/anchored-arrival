'use client';

import { Box, Typography, Container } from '@mui/material';
import { colors, sectionSpace } from '@/theme/theme';

const pillars = [
  {
    title: 'Depth over scripts',
    body: 'No recycled birth-plan templates or one-size care. We build strategy from your history, your values, and what your body is telling you.',
  },
  {
    title: 'Advocacy with grace',
    body: 'I translate clinical language, make space for questions, and help you practice the hard conversations before the day arrives.',
  },
  {
    title: 'Continuity you can feel',
    body: 'The same hands at prenatal visits, in labor when possible, and in the fragile first weeks—so you are never re-explaining yourself.',
  },
];

export default function Differentiators() {
  return (
    <Box
      component="section"
      aria-labelledby="difference-heading"
      sx={{
        py: sectionSpace.y,
        bgcolor: colors.espresso,
        color: colors.ivory,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: { xs: '60%', md: '42%' },
          aspectRatio: '1',
          borderRadius: '50%',
          border: `1px solid rgba(212,201,168,0.12)`,
          pointerEvents: 'none',
        }}
        aria-hidden
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: colors.goldLight,
            fontWeight: 600,
            mb: 2,
          }}
        >
          Why families choose this practice
        </Typography>
        <Typography
          id="difference-heading"
          variant="h2"
          sx={{
            fontSize: { xs: '1.85rem', md: 'clamp(2rem, 3vw, 2.75rem)' },
            color: colors.ivory,
            mb: { xs: 5, md: 7 },
            maxWidth: '18ch',
            fontWeight: 600,
          }}
        >
          A different kind of steadiness.
        </Typography>

        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 4, md: 3 },
            columnGap: { md: 5 },
          }}
        >
          {pillars.map((p, i) => (
            <Box component="li" key={p.title}>
              <Typography
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  lineHeight: 1,
                  color: colors.clay,
                  opacity: 0.45,
                  mb: 2,
                  fontWeight: 500,
                }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: colors.goldLight,
                  mb: 1.5,
                }}
              >
                {p.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.98rem',
                  lineHeight: 1.7,
                  color: 'rgba(250,246,241,0.72)',
                }}
              >
                {p.body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
