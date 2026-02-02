'use client';

import Image from 'next/image';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors } from '@/theme/theme';
import { trackLinkClick, trackSocialClick } from '@/lib/analytics';
import { useScrollDepth } from '@/lib/useScrollDepth';
import { useComingSoonToast } from '@/lib/useComingSoonToast';
import {
  TikTokIcon,
  YouTubeIcon,
  SnapchatIcon,
  InstagramIcon,
  AmazonIcon,
  NetworkIcon,
} from '@/components/Icons';

interface LinkItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  gradient: string;
  hoverGradient: string;
  glowColor: string;
  textColor: string;
}

const links: LinkItem[] = [
  {
    label: 'TikTok @realfeelpurpose',
    href: 'https://www.tiktok.com/@realfeelpurpose',
    icon: <TikTokIcon size={24} />,
    gradient: 'linear-gradient(135deg, #00F2EA 0%, #FF0050 100%)',
    hoverGradient: 'linear-gradient(135deg, #00F2EA 20%, #FF0050 120%)',
    glowColor: '#FF0050',
    textColor: '#fff',
  },
  // Amazon Wishlist
  {
    label: 'Amazon Wishlist',
    href: 'https://www.amazon.com/hz/wishlist/ls/98CRSAC721IV?ref_=wl_share',
    icon: <AmazonIcon size={24} />,
    gradient: 'linear-gradient(135deg, #FF9900 0%, #FF6600 100%)',
    hoverGradient: 'linear-gradient(135deg, #FF9900 20%, #FF6600 120%)',
    glowColor: '#FF9900',
    textColor: '#000',
  },
  {
    label: 'YouTube @AgentMorgan1000',
    href: 'https://www.youtube.com/@AgentMorgan1000',
    icon: <YouTubeIcon size={24} />,
    gradient: 'linear-gradient(135deg, #FF0000 0%, #FFAA00 100%)',
    hoverGradient: 'linear-gradient(135deg, #FF0000 20%, #FFAA00 120%)',
    glowColor: '#FFAA00',
    textColor: '#fff',
  },
  // Snapchat
  {
    label: 'Snapchat',
    href: '#snapchat-coming-soon',
    icon: <SnapchatIcon size={24} />,
    gradient: 'linear-gradient(135deg, #FFFC00 0%, #00D4AA 100%)',
    hoverGradient: 'linear-gradient(135deg, #FFFC00 20%, #00D4AA 120%)',
    glowColor: '#00D4AA',
    textColor: '#000',
  },
  // Instagram
  {
    label: 'Instagram @AgentMorgie',
    href: 'https://www.instagram.com/AgentMorgie',
    icon: <InstagramIcon size={24} />,
    gradient: 'linear-gradient(135deg, #E1306C 0%, #C13584 50%, #833AB4 100%)',
    hoverGradient:
      'linear-gradient(135deg, #E1306C 20%, #C13584 60%, #833AB4 120%)',
    glowColor: '#E1306C',
    textColor: '#fff',
  },
];

export default function LinkTree() {
  useScrollDepth();
  const { showToast, ComingSoonSnackbar } = useComingSoonToast();

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          py: 6,
          background: `radial-gradient(ellipse at top, ${colors.surface} 0%, ${colors.background} 60%)`,
        }}
      >
        <Container maxWidth="sm">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Stack alignItems="center" spacing={2} sx={{ mb: 6 }}>
              {/* Avatar */}
              <Box
                sx={{
                  position: 'relative',
                  width: 100,
                  height: 100,
                  mb: 1,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -3,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                    animation: 'spin 4s linear infinite',
                  },
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `3px solid ${colors.background}`,
                  }}
                >
                  <Image
                    src="/images/main-character.png"
                    alt="Agent Morgie"
                    fill
                    sizes="100px"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                }}
              >
                Links
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.textSecondary,
                  textAlign: 'center',
                  maxWidth: 500,
                }}
              >
                Connect with Agent Morgie 00BA. Double O Badass • TikTok Live
                Creator.
              </Typography>
            </Stack>
          </motion.div>

          {/* Links */}
          <Stack spacing={2} sx={{ mb: 4 }}>
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  startIcon={link.icon}
                  onClick={(e) => {
                    // Handle Snapchat "Coming Soon" click
                    if (link.href === '#snapchat-coming-soon') {
                      e.preventDefault();
                      showToast('Snapchat coming soon!');
                      return;
                    }
                    const isExternal = link.href.startsWith('http');
                    trackLinkClick(link.label, link.href, index, isExternal);
                    // Also track social clicks for TikTok/YouTube/Amazon
                    if (link.href.includes('tiktok.com')) {
                      trackSocialClick('tiktok', 'linktree');
                    } else if (link.href.includes('youtube.com')) {
                      trackSocialClick('youtube', 'linktree');
                    } else if (link.href.includes('instagram.com')) {
                      trackSocialClick('instagram', 'linktree');
                    } else if (link.href.includes('amazon.com')) {
                      trackSocialClick('amazon', 'linktree');
                    }
                  }}
                  sx={{
                    py: 2,
                    px: 3,
                    color: link.textColor,
                    background: link.gradient,
                    backdropFilter: 'blur(8px)',
                    boxShadow: `0 0 20px ${link.glowColor}44`,
                    justifyContent: 'flex-start',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      background: link.hoverGradient,
                      transform: 'translateX(8px)',
                      boxShadow: `0 0 30px ${link.glowColor}66`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {link.label}
                </Button>
              </motion.div>
            ))}
          </Stack>

          {/* For Creators Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Box
              sx={{
                mt: 4,
                pt: 4,
                borderTop: `1px solid ${colors.gold}33`,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  color: colors.gold,
                  letterSpacing: 3,
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                For Creators
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  color: colors.textSecondary,
                  mb: 2,
                  px: 2,
                }}
              >
                Are you a TikTok creator? Join my Creator Network for support,
                training, and growth opportunities.
              </Typography>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  href="https://www.tiktok.com/t/ZTh1ohJwM/"
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<NetworkIcon size={24} />}
                  onClick={() => {
                    trackLinkClick(
                      'Join My Creator Network',
                      'https://www.tiktok.com/t/ZTh1ohJwM/',
                      links.length,
                      true
                    );
                  }}
                  sx={{
                    py: 2,
                    px: 3,
                    color: colors.background,
                    background: `linear-gradient(135deg, ${colors.gold} 0%, #FFA500 100%)`,
                    backdropFilter: 'blur(8px)',
                    boxShadow: `0 0 20px ${colors.gold}44`,
                    fontSize: '1rem',
                    fontWeight: 700,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.gold} 20%, #FFA500 120%)`,
                      boxShadow: `0 0 30px ${colors.gold}66`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Join My Creator Network
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                textAlign: 'center',
                color: colors.textSecondary,
                fontStyle: 'italic',
              }}
            >
              "Live... And Lethal - Morgie&apos;s On a Mission!"
            </Typography>
          </motion.div>
        </Container>
      </Box>
      <ComingSoonSnackbar />
    </>
  );
}
