'use client';

import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/theme';

const phrases = [
  'Ranch Squad',
  'Gooder Than Shit',
  'No Power Ups',
  'Real Ones Only',
  "Com'On",
  'Raise Hell',
  'Pull Up',
  'Suit Up',
];

function HorseshoeIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{
        width: 18,
        height: 18,
        fill: 'none',
        stroke: colors.brass,
        strokeWidth: 2,
        mx: 2,
        flexShrink: 0,
        opacity: 0.6,
      }}
    >
      <path d="M5 2v8a7 7 0 0 0 14 0V2M5 2H3v8a9 9 0 0 0 18 0V2h-2" />
    </Box>
  );
}

function MarqueeContent() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        animation: 'marquee 30s linear infinite',
      }}
    >
      {phrases.map((phrase, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component="span"
            sx={{
              color: colors.amber,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              fontWeight: 600,
              mx: 1,
            }}
          >
            {phrase}
          </Typography>
          <HorseshoeIcon />
        </Box>
      ))}
    </Box>
  );
}

export default function RallyStrip() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        py: 2,
        backgroundColor: colors.darkLeather,
        borderTop: `1px solid ${colors.brass}33`,
        borderBottom: `1px solid ${colors.brass}33`,
        position: 'relative',
        '@keyframes marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <MarqueeContent />
        <MarqueeContent />
      </Box>
    </Box>
  );
}
