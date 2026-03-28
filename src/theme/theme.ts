'use client';

import { createTheme } from '@mui/material/styles';

// Ranch Squad Color Palette
const colors = {
  primary: '#D4A017', // Warm Gold/Amber
  secondary: '#8B2500', // Dusty Red/Barn Red
  accent: '#6B8E23', // Sage Green
  neon: '#FFD700', // Bright Country Gold
  gold: '#FFD700', // Gold
  background: '#0D0A07', // Deep Dark Brown-Black
  surface: '#1A1510', // Dark Leather Brown
  text: '#FFFFFF',
  textSecondary: '#B8A88A',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      light: '#E8B830',
      dark: '#A67C10',
    },
    secondary: {
      main: colors.secondary,
      light: '#B03000',
      dark: '#6B1C00',
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

// Layout constants for consistent spacing
export const layout = {
  navbarHeight: { xs: 56, sm: 64 }, // MUI Toolbar defaults
};

export { colors };
