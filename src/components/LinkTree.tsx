'use client';

import Image from 'next/image';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors } from '@/theme/theme';
import { trackLinkClick, trackSocialClick } from '@/lib/analytics';
import { useScrollDepth } from '@/lib/useScrollDepth';
import { useComingSoonToast } from '@/lib/useComingSoonToast';

// TikTok icon component
const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// YouTube icon component
const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Snapchat icon component
const SnapchatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.732-.271-1.273-.63-1.273-1.096-.014-.46.39-.818.943-.904.074-.016.18-.016.255-.016.21 0 .42.045.615.135.36.181.72.285 1.02.285.181 0 .315-.044.405-.074l-.016-.404c-.104-1.628-.239-3.654.29-4.848C7.861 1.068 11.216.793 12.206.793z" />
  </svg>
);

// Instagram icon component
const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

// Amazon icon component (Bootstrap Icons)
const AmazonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
    <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z"/>
    <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623"/>
  </svg>
);

// Star/Network icon for Creator Network CTA
const NetworkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

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
    icon: <TikTokIcon />,
    gradient: 'linear-gradient(135deg, #00F2EA 0%, #FF0050 100%)',
    hoverGradient: 'linear-gradient(135deg, #00F2EA 20%, #FF0050 120%)',
    glowColor: '#FF0050',
    textColor: '#fff',
  },
  // Amazon Wishlist - Coming Soon
  {
    label: 'Amazon Wishlist',
    href: '#amazon-coming-soon',
    icon: <AmazonIcon />,
    gradient: 'linear-gradient(135deg, #FF9900 0%, #FF6600 100%)',
    hoverGradient: 'linear-gradient(135deg, #FF9900 20%, #FF6600 120%)',
    glowColor: '#FF9900',
    textColor: '#000',
  },
  {
    label: 'YouTube @AgentMorgan1000',
    href: 'https://www.youtube.com/@AgentMorgan1000',
    icon: <YouTubeIcon />,
    gradient: 'linear-gradient(135deg, #FF0000 0%, #FFAA00 100%)',
    hoverGradient: 'linear-gradient(135deg, #FF0000 20%, #FFAA00 120%)',
    glowColor: '#FFAA00',
    textColor: '#fff',
  },
  // Snapchat
  {
    label: 'Snapchat',
    href: '#snapchat-coming-soon',
    icon: <SnapchatIcon />,
    gradient: 'linear-gradient(135deg, #FFFC00 0%, #00D4AA 100%)',
    hoverGradient: 'linear-gradient(135deg, #FFFC00 20%, #00D4AA 120%)',
    glowColor: '#00D4AA',
    textColor: '#000',
  },
  // Instagram
  {
    label: 'Instagram @AgentMorgie',
    href: 'https://www.instagram.com/AgentMorgie',
    icon: <InstagramIcon />,
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
                    // Handle "Coming Soon" clicks
                    if (link.href === '#snapchat-coming-soon') {
                      e.preventDefault();
                      showToast('Snapchat coming soon!');
                      return;
                    }
                    if (link.href === '#amazon-coming-soon') {
                      e.preventDefault();
                      showToast('Amazon Wishlist coming soon!');
                      return;
                    }
                    const isExternal = link.href.startsWith('http');
                    trackLinkClick(link.label, link.href, index, isExternal);
                    // Also track social clicks for TikTok/YouTube
                    if (link.href.includes('tiktok.com')) {
                      trackSocialClick('tiktok', 'linktree');
                    } else if (link.href.includes('youtube.com')) {
                      trackSocialClick('youtube', 'linktree');
                    } else if (link.href.includes('instagram.com')) {
                      trackSocialClick('instagram', 'linktree');
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
                  startIcon={<NetworkIcon />}
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
