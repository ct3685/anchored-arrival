'use client';

import { createTheme } from '@mui/material/styles';

// Agent Morgie 00BA Color Palette
const colors = {
  primary: '#FF69B4',      // Hot Pink
  secondary: '#00D4FF',    // Electric Cyan
  accent: '#9B59B6',       // Purple
  neon: '#ADFF2F',         // Green-Yellow (Live & Lethal)
  gold: '#FFD700',         // Crown/MVP accents
  background: '#0D0D1A',   // Deep purple-black
  surface: '#1A1A2E',      // Slightly lighter surface
  text: '#FFFFFF',
  textSecondary: '#B8B8D1',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      light: '#FF8DC7',
      dark: '#E91E8C',
    },
    secondary: {
      main: colors.secondary,
      light: '#66E5FF',
      dark: '#00A3CC',
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textSecondary,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '12px 32px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 0 20px ${colors.primary}66`,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary} 20%, ${colors.accent} 120%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.neon} 100%)`,
          color: colors.background,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.secondary} 20%, ${colors.neon} 120%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.surface,
          borderRadius: 16,
          border: `1px solid ${colors.primary}22`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: `${colors.background}CC`,
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.primary}22`,
        },
      },
    },
  },
});

export { colors };
