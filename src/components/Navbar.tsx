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
  trackOutboundClick,
} from '@/lib/analytics';
import { colors } from '@/theme/theme';
import { useLiveStatus } from '@/lib/useLiveStatus';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  isLiveLink?: boolean;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isLive, tiktokHref } = useLiveStatus();

  const navItems: NavItem[] = [
    { label: 'Ranch', href: '/' },
    {
      label: isLive ? 'Live Now' : 'Join the Ranch',
      href: tiktokHref,
      external: true,
      isLiveLink: true,
    },
    {
      label: 'Gear',
      href: 'https://kingstreetcowboys.com/affiliates/trevorbfit',
      external: true,
    },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Music', href: '/music' },
    { label: 'Links', href: '/links' },
  ];

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
    navType: 'desktop' | 'mobile',
    isExternal?: boolean
  ) => {
    trackNavClick(label, href, navType);
    if (isExternal) {
      trackOutboundClick(href, label, `nav_${navType}`);
    }
  };

  const handleLogoClick = () => {
    trackLogoClick();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
          }}
        >
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
                  fontWeight: 700,
                  color: colors.amber,
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
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
              sx={{ color: colors.bone }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.isLiveLink ? 'tiktok-live' : item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    style={{ textDecoration: 'none' }}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    onClick={() =>
                      handleNavClick(item.label, item.href, 'desktop', item.external)
                    }
                  >
                    <Button
                      sx={{
                        color:
                          item.isLiveLink && isLive ? colors.red : colors.bone,
                        fontSize: '0.85rem',
                        letterSpacing: '0.1em',
                        px: 2,
                        py: 0.8,
                        border: 'none',
                        borderRadius: 0,
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          width: 0,
                          height: '2px',
                          background:
                            item.isLiveLink && isLive
                              ? colors.red
                              : colors.amber,
                          transition: 'all 0.2s ease',
                          transform: 'translateX(-50%)',
                        },
                        '&:hover': {
                          color:
                            item.isLiveLink && isLive
                              ? colors.red
                              : colors.amber,
                          backgroundColor: 'transparent',
                          boxShadow: 'none',
                          '&::after': {
                            width: '60%',
                          },
                        },
                      }}
                    >
                      {item.isLiveLink && isLive && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: colors.red,
                            animation: 'navLiveDot 1.5s ease-in-out infinite',
                            '@keyframes navLiveDot': {
                              '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                              '50%': { opacity: 0.4, transform: 'scale(0.7)' },
                            },
                          }}
                        />
                      )}
                      {item.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          sx: { zIndex: 1200 },
        }}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 300,
            backgroundColor: colors.smokeBlack,
            backgroundImage: 'none',
            borderLeft: `1px solid ${colors.brass}33`,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: colors.amber,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Ranch Squad
            </Typography>
            <IconButton
              onClick={handleDrawerToggle}
              aria-label="Close menu"
              sx={{ color: colors.bone }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.isLiveLink ? 'tiktok-live' : item.href}
                disablePadding
              >
                <Link
                  href={item.href}
                  style={{ textDecoration: 'none', width: '100%' }}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    handleNavClick(item.label, item.href, 'mobile', item.external);
                    handleDrawerToggle();
                  }}
                >
                  <ListItemButton
                    sx={{
                      borderBottom: `1px solid ${colors.brass}22`,
                      py: 2,
                      '&:hover': {
                        backgroundColor: `${colors.amber}11`,
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {item.isLiveLink && isLive && (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: colors.red,
                                animation:
                                  'navLiveDot 1.5s ease-in-out infinite',
                                '@keyframes navLiveDot': {
                                  '0%, 100%': {
                                    opacity: 1,
                                    transform: 'scale(1)',
                                  },
                                  '50%': {
                                    opacity: 0.4,
                                    transform: 'scale(0.7)',
                                  },
                                },
                              }}
                            />
                          )}
                          <Box
                            component="span"
                            sx={{
                              color:
                                item.isLiveLink && isLive
                                  ? colors.red
                                  : colors.bone,
                              fontFamily: 'var(--font-display)',
                              fontWeight: 600,
                              fontSize: '1.4rem',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {item.label}
                          </Box>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Toolbar />
    </>
  );
}
