'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
import { colors, sectionSpace } from '@/theme/theme';
import SectionDivider from './SectionDivider';

const testimonials = [
  {
    quote:
      'Alissa was the steadiness we did not know we would need. In the chaos, she made eye contact like an anchor—no drama, just truth.',
    name: 'Sarah M.',
    context: 'First birth',
  },
  {
    quote:
      'The education was not fluffy encouragement. It was sharp, honest, and it changed how I spoke to my providers—and to myself.',
    name: 'Jenna T.',
    context: 'Birth education',
  },
  {
    quote:
      'Postpartum was lonelier than I expected. Having someone who normalized the grief alongside the joy saved my sense of self.',
    name: 'Rachel K.',
    context: 'Postpartum care',
  },
];

export default function Testimonials() {
  return (
    <Box
      component="section"
      aria-labelledby="testimonials-heading"
      sx={{
        py: sectionSpace.y,
        bgcolor: colors.linen,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: colors.bronzeMuted,
            textAlign: 'center',
            fontWeight: 600,
            mb: 1,
          }}
        >
          Proof of presence
        </Typography>

        <Typography
          id="testimonials-heading"
          variant="h2"
          textAlign="center"
          sx={{
            mb: 0,
            fontSize: { xs: '2rem', md: '2.65rem' },
            color: colors.espresso,
            fontWeight: 600,
          }}
        >
          Voices from the threshold
        </Typography>

        <SectionDivider ornament={false} />

        <Grid container spacing={{ xs: 3, md: 2 }} sx={{ mt: { xs: 1, md: 2 } }}>
          {testimonials.map((t) => (
            <Grid key={t.name} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: { xs: 3, md: 3.5 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'rgba(250,246,241,0.55)',
                  border: '1px solid rgba(58,53,48,0.06)',
                  transition: 'box-shadow 0.45s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                  '&:hover': {
                    boxShadow: '0 28px 56px rgba(30,26,23,0.06)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    lineHeight: 1,
                    color: colors.clay,
                    opacity: 0.35,
                    mb: -1,
                    userSelect: 'none',
                  }}
                  aria-hidden
                >
                  &ldquo;
                </Typography>

                <Typography
                  sx={{
                    fontFamily: 'var(--font-accent)',
                    fontStyle: 'italic',
                    fontSize: { xs: '1.05rem', md: '1.08rem' },
                    lineHeight: 1.75,
                    color: colors.charcoal,
                    flex: 1,
                    mb: 3,
                  }}
                >
                  {t.quote}
                </Typography>

                <Box
                  sx={{
                    borderTop: `1px solid rgba(184,152,106,0.22)`,
                    pt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: colors.espresso,
                    }}
                  >
                    {t.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: colors.warmGray,
                      mt: 0.5,
                    }}
                  >
                    {t.context}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
