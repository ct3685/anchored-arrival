'use client';

import { createTheme } from '@mui/material/styles';

/** Anchored Arrival — earthy luxury design tokens */
export const colors = {
  parchment: '#F5EDE3',
  linen: '#F0E8DE',
  sand: '#E8DED2',
  clay: '#C9967B',
  clayDeep: '#A67A5B',
  blushLight: '#EEDAD2',
  charcoal: '#3A3530',
  espresso: '#2C2622',
  warmGray: '#7A7168',
  warmGrayMuted: '#9A9188',
  bronze: '#8B6914',
  bronzeMuted: '#9A7B4F',
  gold: '#B8986A',
  goldLight: '#D4C9A8',
  ivory: '#FAF6F1',
  warmWhite: '#FFFDF9',
  ink: '#1E1A17',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.clay,
      light: colors.blushLight,
      dark: colors.clayDeep,
    },
    secondary: {
      main: colors.gold,
      light: colors.goldLight,
      dark: '#96774E',
    },
    background: {
      default: colors.parchment,
      paper: colors.ivory,
    },
    text: {
      primary: colors.charcoal,
      secondary: colors.warmGray,
    },
  },
  typography: {
    fontFamily: 'var(--font-sans), system-ui, sans-serif',
    h1: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.12,
    },
    h3: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 500,
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h6: {
      fontFamily: 'var(--font-display), Georgia, serif',
      fontWeight: 500,
      lineHeight: 1.35,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.65,
    },
    body2: {
      fontSize: '0.9375rem',
      lineHeight: 1.65,
    },
    button: {
      fontFamily: 'var(--font-sans), system-ui, sans-serif',
      fontWeight: 600,
      textTransform: 'none' as const,
      letterSpacing: '0.06em',
    },
  },
  shape: {
    borderRadius: 2,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '14px 32px',
          fontSize: '0.8125rem',
          boxShadow: 'none',
          transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.35s ease, border-color 0.35s ease, color 0.35s ease',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        containedPrimary: {
          background: colors.espresso,
          color: colors.ivory,
          '&:hover': {
            background: colors.ink,
          },
        },
        outlinedPrimary: {
          borderColor: colors.espresso,
          color: colors.espresso,
          borderWidth: 1,
          backgroundColor: 'transparent',
          '&:hover': {
            borderWidth: 1,
            borderColor: colors.charcoal,
            backgroundColor: 'rgba(44,38,34,0.04)',
          },
        },
        textPrimary: {
          color: colors.clayDeep,
          '&:hover': {
            backgroundColor: 'rgba(201,150,123,0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.ivory,
          borderRadius: 0,
          border: '1px solid rgba(58,53,48,0.06)',
          boxShadow: '0 24px 48px rgba(30,26,23,0.06)',
          transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 32px 64px rgba(30,26,23,0.08)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(250,246,241,0.88)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(58,53,48,0.08)',
          color: colors.charcoal,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:before': {
            borderBottomColor: colors.goldLight,
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: colors.gold,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: colors.clay,
          },
          '& .MuiInputLabel-root': {
            color: colors.warmGray,
            fontFamily: 'var(--font-sans), system-ui, sans-serif',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: colors.clay,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          '@media (min-width:1200px)': {
            maxWidth: 1140,
          },
        },
      },
    },
  },
});

export const layout = {
  navbarHeight: { xs: 56, sm: 64 },
};

/** Semantic spacing rhythm (px) for sections */
export const sectionSpace = {
  y: { xs: 10, md: 14 },
  yTight: { xs: 8, md: 11 },
};
