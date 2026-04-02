'use client';

import { Box, Typography, Container, Grid } from '@mui/material';
import { colors } from '@/theme/theme';
import SectionDivider from './SectionDivider';

const services = [
  {
    title: 'Doula Support',
    description:
      'Continuous emotional, physical, and informational support throughout your pregnancy, labor, and delivery.',
    accent: colors.terraCotta,
  },
  {
    title: 'Birth Education',
    description:
      'Comprehensive childbirth education classes available via Zoom, covering breathing techniques, labor stages, and birth planning.',
    accent: colors.gold,
  },
  {
    title: 'Lactation Counseling',
    description:
      'Personalized breastfeeding support and guidance to help you and your baby thrive from day one.',
    accent: colors.terraCotta,
  },
  {
    title: '3D Ultrasound Imaging',
    description:
      'Beautiful 3D imaging sessions so you can see and bond with your baby before birth.',
    accent: colors.gold,
  },
  {
    title: 'Postpartum Support',
    description:
      'Emotional and practical support during the postpartum period, including resources for postpartum depression.',
    accent: colors.terraCotta,
  },
];

export default function Services({ detailed = false }: { detailed?: boolean }) {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: detailed ? 'background.default' : 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.8rem' } }}
        >
          Our Services
        </Typography>

        <SectionDivider />

        <Typography
          textAlign="center"
          sx={{
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
            fontSize: { xs: '1.05rem', md: '1.2rem' },
            color: 'text.secondary',
            mb: { xs: 6, md: 8 },
            maxWidth: 560,
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          Holistic care for every stage of your maternal journey — from
          pregnancy through postpartum and beyond.
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service) => (
            <Grid key={service.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  p: { xs: 3.5, md: 4 },
                  height: '100%',
                  borderTop: `3px solid ${service.accent}`,
                  boxShadow: '0 1px 8px rgba(44,38,34,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 24px rgba(44,38,34,0.08)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontSize: { xs: '1.15rem', md: '1.25rem' },
                    fontWeight: 600,
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.75,
                    fontSize: '0.95rem',
                  }}
                >
                  {service.description}
                </Typography>
                {detailed && (
                  <Typography
                    sx={{
                      mt: 2.5,
                      pt: 2.5,
                      borderTop: `1px solid rgba(184,152,106,0.2)`,
                      fontSize: '0.85rem',
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      fontFamily: 'var(--font-accent)',
                    }}
                  >
                    Available in-home and via Zoom. Contact us for pricing and
                    availability.
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
