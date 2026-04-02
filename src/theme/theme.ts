'use client';

import { createTheme } from '@mui/material/styles';

const colors = {
  parchment: '#F5EDE3',
  terraCotta: '#C9967B',
  terraCottaDark: '#A67A5B',
  blushLight: '#EEDAD2',
  charcoal: '#3A3530',
  warmGray: '#7A7168',
  gold: '#B8986A',
  goldLight: '#D4C9A8',
  ivory: '#FAF6F1',
  espresso: '#2C2622',
  warmWhite: '#FFFDF9',
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.terraCotta,
      light: colors.blushLight,
      dark: colors.terraCottaDark,
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
    fontFamily: 'var(--font-body)',
    h1: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      letterSpacing: '0.04em',
      lineHeight: 1.15,
    },
    h2: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      letterSpacing: '0.02em',
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
      letterSpacing: '0.04em',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          padding: '14px 36px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: colors.terraCotta,
          color: colors.warmWhite,
          '&:hover': {
            background: colors.terraCottaDark,
          },
        },
        outlinedPrimary: {
          borderColor: colors.terraCotta,
          color: colors.terraCotta,
          borderWidth: 1.5,
          '&:hover': {
            borderColor: colors.terraCottaDark,
            borderWidth: 1.5,
            background: 'rgba(201,150,123,0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.ivory,
          borderRadius: 2,
          border: 'none',
          boxShadow: '0 1px 8px rgba(44,38,34,0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(44,38,34,0.08)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(245,237,227,0.92)',
          backdropFilter: 'blur(16px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(184,152,106,0.15)',
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
            borderBottomColor: colors.terraCotta,
          },
          '& .MuiInputLabel-root': {
            color: colors.warmGray,
            fontFamily: 'var(--font-body)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: colors.terraCotta,
          },
        },
      },
    },
  },
});

export const layout = {
  navbarHeight: { xs: 56, sm: 64 },
};

export { colors };
