'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
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
          {/* Photo placeholder */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '4 / 5',
                bgcolor: colors.blushLight,
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(44,38,34,0.08)',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at center, rgba(201,150,123,0.1) 0%, transparent 70%)',
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'var(--font-accent)',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: colors.warmGray,
                  opacity: 0.6,
                  zIndex: 1,
                }}
              >
                Photo coming soon
              </Typography>
            </Box>
          </Grid>

          {/* Text content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: colors.gold,
                mb: 2,
              }}
            >
              {full ? 'Our Story' : 'About'}
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
                Every family deserves to feel grounded, informed, and fully
                supported during one of life&apos;s most transformative
                experiences.
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
              At Anchored Arrival, my mission is to empower birthing people with
              knowledge, comfort, and unwavering advocacy so they can approach
              pregnancy, birth, and postpartum with confidence.
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
                  I&apos;m Alissa Thorson — a certified doula passionate about
                  maternal wellness and helping families feel anchored through
                  every stage of their journey. My practice offers a holistic
                  approach that honors each family&apos;s unique story. Whether
                  you&apos;re a first-time parent or expanding your family, I
                  provide personalized care tailored to your needs.
                </Typography>
                <Typography
                  sx={{
                    mb: 3,
                    lineHeight: 1.85,
                    color: 'text.secondary',
                    fontSize: '0.98rem',
                  }}
                >
                  I offer both in-home visits and virtual consultations via
                  Zoom, making expert support accessible no matter where you
                  are. From birth education classes to lactation counseling and
                  postpartum check-ins, I&apos;m with you every step of the way.
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
