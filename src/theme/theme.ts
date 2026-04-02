'use client';

import { createTheme } from '@mui/material/styles';

const colors = {
  sage: '#7A9E7E',
  sageDark: '#5C7E60',
  sageLight: '#A8C5AB',
  blush: '#E8B4B8',
  blushDark: '#D4949A',
  rose: '#C27882',
  cream: '#FDF8F0',
  ivory: '#FAF5ED',
  warmWhite: '#FFFFFF',
  gold: '#C5A55A',
  goldLight: '#D4BE82',
  charcoal: '#3D3D3D',
  textPrimary: '#2C2C2C',
  textSecondary: '#6B6B6B',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.sage,
      light: colors.sageLight,
      dark: colors.sageDark,
    },
    secondary: {
      main: colors.blush,
      light: '#F0CDD0',
      dark: colors.blushDark,
    },
    background: {
      default: colors.cream,
      paper: colors.warmWhite,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  typography: {
    fontFamily: 'var(--font-body)',
    h1: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '-0.005em',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      lineHeight: 1.35,
    },
    h6: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    button: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      textTransform: 'none' as const,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 28px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(122,158,126,0.25)',
          },
        },
        containedPrimary: {
          background: colors.sage,
          color: '#fff',
          '&:hover': {
            background: colors.sageDark,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.warmWhite,
          borderRadius: 16,
          border: `1px solid ${colors.ivory}`,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(253,248,240,0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: 'none',
          borderBottom: `1px solid rgba(0,0,0,0.06)`,
          color: colors.textPrimary,
        },
      },
    },
  },
});

export const layout = {
  navbarHeight: { xs: 56, sm: 64 },
};

export { colors };
