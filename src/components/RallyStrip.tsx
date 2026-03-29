'use client';

import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/theme';
import { useLiveStatus } from '@/lib/useLiveStatus';

const defaultPhrases = [
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

function LiveDot() {
  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: colors.red,
        display: 'inline-block',
        mr: 0.8,
        animation: 'liveDotPulse 1.5s ease-in-out infinite',
        '@keyframes liveDotPulse': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(0.8)' },
        },
      }}
    />
  );
}

function MarqueeContent({
  phrases,
  isLive,
}: {
  phrases: string[];
  isLive: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        animation: `marquee ${isLive ? '22s' : '30s'} linear infinite`,
      }}
    >
      {phrases.map((phrase, i) => {
        const isLivePhrase = phrase === 'LIVE NOW';
        return (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component="span"
              sx={{
                color: isLivePhrase ? colors.red : colors.amber,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                fontWeight: isLivePhrase ? 700 : 600,
                mx: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {isLivePhrase && <LiveDot />}
              {phrase}
            </Typography>
            <HorseshoeIcon />
          </Box>
        );
      })}
    </Box>
  );
}

export default function RallyStrip() {
  const { isLive } = useLiveStatus();

  const phrases = isLive
    ? ['LIVE NOW', ...defaultPhrases]
    : defaultPhrases;

  return (
    <Box
      sx={{
        overflow: 'hidden',
        py: 2,
        backgroundColor: colors.darkLeather,
        borderTop: `1px solid ${isLive ? colors.red + '44' : colors.brass + '33'}`,
        borderBottom: `1px solid ${isLive ? colors.red + '44' : colors.brass + '33'}`,
        position: 'relative',
        transition: 'border-color 1s ease',
        '@keyframes marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <MarqueeContent phrases={phrases} isLive={isLive} />
        <MarqueeContent phrases={phrases} isLive={isLive} />
      </Box>
    </Box>
  );
}
