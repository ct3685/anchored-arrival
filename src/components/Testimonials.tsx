'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
import { colors } from '@/theme/theme';
import SectionDivider from './SectionDivider';

const testimonials = [
  {
    quote:
      'Alissa made us feel so safe and prepared. Her presence during labor was an anchor in the most beautiful storm of our lives.',
    name: 'Sarah M.',
    context: 'First-time mother',
  },
  {
    quote:
      'I went from feeling overwhelmed to feeling powerful. The birth education classes changed everything about how I approached my delivery.',
    name: 'Jenna T.',
    context: 'Birth education client',
  },
  {
    quote:
      'The postpartum support was a lifeline. Having someone who truly understood what I was going through made all the difference.',
    name: 'Rachel K.',
    context: 'Postpartum support client',
  },
];

export default function Testimonials() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.gold,
            textAlign: 'center',
            mb: 1,
          }}
        >
          Testimonials
        </Typography>

        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.8rem' } }}
        >
          Words from Families
        </Typography>

        <SectionDivider />

        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: { xs: 2, md: 4 } }}>
          {testimonials.map((t) => (
            <Grid key={t.name} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: { xs: 3.5, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {/* Gold open-quote */}
                <Typography
                  sx={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '4rem',
                    lineHeight: 1,
                    color: colors.gold,
                    opacity: 0.35,
                    mb: -2,
                    userSelect: 'none',
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </Typography>

                <Typography
                  sx={{
                    fontFamily: 'var(--font-accent)',
                    fontStyle: 'italic',
                    fontSize: { xs: '1.05rem', md: '1.12rem' },
                    lineHeight: 1.75,
                    color: 'text.primary',
                    flex: 1,
                    mb: 3,
                  }}
                >
                  {t.quote}
                </Typography>

                <Box
                  sx={{
                    borderTop: `1px solid rgba(184,152,106,0.25)`,
                    pt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      color: 'text.primary',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-accent)',
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      color: 'text.secondary',
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
