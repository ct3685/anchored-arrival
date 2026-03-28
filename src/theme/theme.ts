'use client';

import { createTheme } from '@mui/material/styles';

// Neon Rodeo Color Palette
const colors = {
  primary: '#F59E0B',      // Electric amber
  secondary: '#DC2626',     // Rodeo red
  accent: '#40E0D0',        // Turquoise (western jewelry)
  neon: '#FF6B00',          // Hot orange
  gold: '#FFD700',          // Keep gold
  background: '#0C0A09',    // Near-black
  surface: '#1C1917',       // Dark slate
  text: '#FFFFFF',
  textSecondary: '#A8A29E', // Warm gray
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      light: '#FBBF24',
      dark: '#D97706',
    },
    secondary: {
      main: colors.secondary,
      light: '#EF4444',
      dark: '#B91C1C',
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
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.neon} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary} 20%, ${colors.neon} 120%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.neon} 100%)`,
          color: '#fff',
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
