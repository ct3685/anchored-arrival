'use client';

import { Box, Typography, Container } from '@mui/material';
import { colors, sectionSpace } from '@/theme/theme';
import SectionDivider from './SectionDivider';

const steps = [
  {
    phase: 'I',
    title: 'Discovery call',
    text: 'A no-pressure conversation about your timeline, hopes, and what “supported” means to you.',
  },
  {
    phase: 'II',
    title: 'Prenatal depth work',
    text: 'Education, birth preferences, comfort measures, and rehearsal for the decisions that often arrive unannounced.',
  },
  {
    phase: 'III',
    title: 'Labor & birth',
    text: 'Continuous presence, positional support, emotional grounding, and partnership with your clinical team.',
  },
  {
    phase: 'IV',
    title: 'Fourth trimester',
    text: 'Lactation guidance, recovery check-ins, and gentle navigation of the identity shift that follows.',
  },
];

export default function ProcessSection() {
  return (
    <Box
      component="section"
      aria-labelledby="process-heading"
      sx={{
        py: sectionSpace.yTight,
        bgcolor: 'background.paper',
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
            fontWeight: 600,
            textAlign: 'center',
            mb: 1,
          }}
        >
          The arc of care
        </Typography>
        <Typography
          id="process-heading"
          variant="h2"
          textAlign="center"
          sx={{
            fontSize: { xs: '1.9rem', md: '2.5rem' },
            color: colors.espresso,
            mb: 0,
            fontWeight: 600,
          }}
        >
          How we move together
        </Typography>
        <SectionDivider ornament={false} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: { xs: 3, md: 2 },
            mt: { xs: 2, md: 4 },
          }}
        >
          {steps.map((s, idx) => (
            <Box
              key={s.phase}
              sx={{
                pt: 3,
                pr: { md: idx < steps.length - 1 ? 2 : 0 },
                borderTop: `1px solid rgba(58,53,48,0.12)`,
                position: 'relative',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                  color: colors.clayDeep,
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                {s.phase}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: colors.espresso,
                  mb: 1.5,
                }}
              >
                {s.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  color: colors.warmGray,
                  lineHeight: 1.65,
                }}
              >
                {s.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
