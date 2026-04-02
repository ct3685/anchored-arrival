'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
import Image from 'next/image';
import { colors } from '@/theme/theme';

export default function About({ full = false }: { full?: boolean }) {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: full ? 'background.paper' : 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          direction={{ xs: 'column-reverse', md: 'row' }}
        >
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: '2px',
                boxShadow: '0 8px 32px rgba(44,38,34,0.08)',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at center, rgba(201,150,123,0.08) 0%, transparent 65%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                },
              }}
            >
              <Image
                src="/images/maternity-portrait-standing.png"
                alt="Pregnant person in a linen drape, holding their belly in calm, natural light."
                fill
                sizes="(max-width: 900px) 100vw, 38vw"
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              />
            </Box>
          </Grid>

          {/* Text content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: colors.bronzeMuted,
                fontWeight: 600,
                mb: 2,
              }}
            >
              {full ? 'Our story' : 'About'}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                mb: 4,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
              }}
            >
              {full ? 'About Anchored Arrival' : 'Our Philosophy'}
            </Typography>

            {/* Pull quote */}
            <Box
              sx={{
                borderLeft: `2px solid ${colors.gold}`,
                pl: 3,
                mb: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'var(--font-accent)',
                  fontStyle: 'italic',
                  fontSize: { xs: '1.15rem', md: '1.35rem' },
                  color: 'text.primary',
                  lineHeight: 1.7,
                }}
              >
                You are not fragile for wanting care that matches the gravity of
                what you are doing.
              </Typography>
            </Box>

            <Typography
              sx={{
                mb: 3,
                lineHeight: 1.85,
                color: 'text.secondary',
                fontSize: '0.98rem',
              }}
            >
              Anchored Arrival exists so you do not have to borrow courage from
              thin air. I bring preparation, advocacy, and a calm that does not
              depend on everything going to plan.
            </Typography>

            {full && (
              <>
                <Typography
                  sx={{
                    mb: 3,
                    lineHeight: 1.85,
                    color: 'text.secondary',
                    fontSize: '0.98rem',
                  }}
                >
                  I&apos;m Alissa Thorson. My practice sits at the intersection
                  of rigor and tenderness—clinical literacy without coldness,
                  warmth without fluff. First baby or fourth, every arc deserves
                  its own map.
                </Typography>
                <Typography
                  sx={{
                    mb: 3,
                    lineHeight: 1.85,
                    color: 'text.secondary',
                    fontSize: '0.98rem',
                  }}
                >
                  In-home and Zoom sessions keep expert support within reach.
                  Education, lactation, labor, and postpartum are woven as one
                  continuum—not disconnected add-ons.
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
