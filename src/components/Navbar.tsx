'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'motion/react';
import {
  trackNavClick,
  trackMobileMenuOpen,
  trackMobileMenuClose,
  trackLogoClick,
} from '@/lib/analytics';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Music', href: '/music' },
  { label: 'Links', href: '/links' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    if (mobileOpen) {
      trackMobileMenuClose();
    } else {
      trackMobileMenuOpen();
    }
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (
    label: string,
    href: string,
    navType: 'desktop' | 'mobile'
  ) => {
    trackNavClick(label, href, navType);
  };

  const handleLogoClick = () => {
    trackLogoClick();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              style={{ textDecoration: 'none' }}
              onClick={handleLogoClick}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background:
                    'linear-gradient(135deg, #D4A017 0%, #FFD700 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                }}
              >
                Ranch Squad
              </Typography>
            </Link>
          </motion.div>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    style={{ textDecoration: 'none' }}
                    onClick={() =>
                      handleNavClick(item.label, item.href, 'desktop')
                    }
                  >
                    <Button
                      sx={{
                        color: 'white',
                        '&:hover': {
                          color: '#D4A017',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 300,
            backgroundColor: '#0D0A07',
            backgroundImage: 'none',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: 'white', mb: 2 }}
          >
            <CloseIcon />
          </IconButton>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <Link
                  href={item.href}
                  style={{ textDecoration: 'none', width: '100%' }}
                  onClick={() => {
                    handleNavClick(item.label, item.href, 'mobile');
                    handleDrawerToggle();
                  }}
                >
                  <ListItemButton
                    sx={{
                      '&:hover': {
                        backgroundColor: '#D4A01722',
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      sx={{
                        '& .MuiTypography-root': {
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '1.2rem',
                        },
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
}
