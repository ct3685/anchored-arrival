'use client';

import { Box, Typography, Container } from '@mui/material';
import { colors } from '@/theme/theme';

const items = [
  { label: 'Continuous labor support', detail: 'Presence when intensity peaks' },
  { label: 'Evidence-informed guidance', detail: 'No fear-mongering, no noise' },
  { label: 'In-home & virtual', detail: 'Care that meets you where you are' },
];

export default function TrustStrip() {
  return (
    <Box
      component="section"
      aria-label="Practice highlights"
      sx={{
        borderTop: `1px solid rgba(58,53,48,0.08)`,
        borderBottom: `1px solid rgba(58,53,48,0.08)`,
        bgcolor: 'rgba(250,246,241,0.65)',
        py: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: { xs: 3, md: 4 },
            textAlign: { xs: 'left', sm: 'center' },
          }}
        >
          {items.map((item) => (
            <Box key={item.label}>
              <Typography
                sx={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: colors.bronzeMuted,
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'var(--font-accent)',
                  fontStyle: 'italic',
                  fontSize: { xs: '0.98rem', md: '1.02rem' },
                  color: colors.warmGray,
                  lineHeight: 1.55,
                  maxWidth: 280,
                  mx: { sm: 'auto' },
                }}
              >
                {item.detail}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
