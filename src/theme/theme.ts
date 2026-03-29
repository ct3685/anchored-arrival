'use client';

import { createTheme } from '@mui/material/styles';

// Neon Rodeo Panic -- Spec-aligned palette
const colors = {
  // Base
  smokeBlack: '#0D0A09',
  coalBrown: '#18110E',
  darkLeather: '#241813',
  // Primary accents
  amber: '#F5A623',
  red: '#D33A2C',
  turquoise: '#33C6C0',
  // Support
  bone: '#F2E6D8',
  brass: '#B88746',
  dust: '#8B7463',

  // Aliases used throughout components
  primary: '#F5A623',
  secondary: '#D33A2C',
  accent: '#33C6C0',
  neon: '#F5A623', // legacy alias → amber
  background: '#0D0A09',
  surface: '#18110E',
  surfaceAlt: '#241813',
  text: '#F2E6D8',
  textSecondary: '#8B7463',
  gold: '#B88746',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.amber,
      light: '#F7BD5E',
      dark: '#C4841C',
    },
    secondary: {
      main: colors.red,
      light: '#E05A4D',
      dark: '#A82E22',
    },
    background: {
      default: colors.smokeBlack,
      paper: colors.coalBrown,
    },
    text: {
      primary: colors.bone,
      secondary: colors.dust,
    },
  },
  typography: {
    fontFamily: 'var(--font-body)',
    h1: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      letterSpacing: '0.04em',
      textTransform: 'uppercase' as const,
      lineHeight: 1,
    },
    h2: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      letterSpacing: '0.03em',
      textTransform: 'uppercase' as const,
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      letterSpacing: '0.02em',
      textTransform: 'uppercase' as const,
      lineHeight: 1.15,
    },
    h4: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.02em',
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.01em',
      lineHeight: 1.25,
    },
    h6: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    button: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
    },
    overline: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.15em',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: '14px 32px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          border: `1px solid ${colors.brass}44`,
          position: 'relative' as const,
          '&:hover': {
            boxShadow: `0 0 24px ${colors.amber}44`,
            borderColor: colors.amber,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.amber} 0%, ${colors.brass} 100%)`,
          color: colors.smokeBlack,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.amber} 20%, ${colors.brass} 120%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${colors.red} 0%, #E05A4D 100%)`,
          color: '#fff',
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.red} 20%, #E05A4D 120%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.coalBrown,
          borderRadius: 2,
          border: `1px solid ${colors.brass}33`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: `${colors.smokeBlack}EE`,
          backdropFilter: 'blur(12px)',
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.brass}33`,
        },
      },
    },
  },
});

export const layout = {
  navbarHeight: { xs: 56, sm: 64 },
};

// Reusable clip-path definitions
export const clipPaths = {
  ticketStub:
    'polygon(0% 8%, 4% 8%, 4% 0%, 96% 0%, 96% 8%, 100% 8%, 100% 92%, 96% 92%, 96% 100%, 4% 100%, 4% 92%, 0% 92%)',
  cattleTag:
    'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
  clippedCorner:
    'polygon(0% 0%, calc(100% - 16px) 0%, 100% 16px, 100% 100%, 16px 100%, 0% calc(100% - 16px))',
  clippedCornerSm:
    'polygon(0% 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 10px 100%, 0% calc(100% - 10px))',
  buckleFrame:
    'polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)',
};

export { colors };
