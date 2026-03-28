'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { motion } from 'motion/react';
import { colors } from '@/theme/theme';
import {
  trackLinkClick,
  trackSocialClick,
  trackInAppBrowserLinkCopied,
} from '@/lib/analytics';
import { useScrollDepth } from '@/lib/useScrollDepth';
// import { useComingSoonToast } from '@/lib/useComingSoonToast';
import { useInAppBrowser, isProblematicUrl } from '@/lib/useInAppBrowser';
import {
  TikTokIcon,
  YouTubeIcon,
  InstagramIcon,
  FacebookIcon,
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
    label: 'TikTok @trevor_bfit',
    href: 'https://www.tiktok.com/@trevor_bfit',
    icon: <TikTokIcon size={24} />,
    gradient: 'linear-gradient(135deg, #00F2EA 0%, #FF0050 100%)',
    hoverGradient: 'linear-gradient(135deg, #00F2EA 20%, #FF0050 120%)',
    glowColor: '#FF0050',
    textColor: '#fff',
  },
  {
    label: '🔴 TikTok LIVE',
    href: 'https://www.tiktok.com/@trevor_bfit/live',
    icon: <TikTokIcon size={24} />,
    gradient: 'linear-gradient(135deg, #FF0050 0%, #FF4500 100%)',
    hoverGradient: 'linear-gradient(135deg, #FF0050 20%, #FF4500 120%)',
    glowColor: '#FF0050',
    textColor: '#fff',
  },
  {
    label: 'Instagram @trevor_bfit',
    href: 'https://www.instagram.com/trevor_bfit',
    icon: <InstagramIcon size={24} />,
    gradient: 'linear-gradient(135deg, #E1306C 0%, #C13584 50%, #833AB4 100%)',
    hoverGradient:
      'linear-gradient(135deg, #E1306C 20%, #C13584 60%, #833AB4 120%)',
    glowColor: '#E1306C',
    textColor: '#fff',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCLi7yoT4PGBY2k0o5hGvDwg',
    icon: <YouTubeIcon size={24} />,
    gradient: 'linear-gradient(135deg, #FF0000 0%, #FFAA00 100%)',
    hoverGradient: 'linear-gradient(135deg, #FF0000 20%, #FFAA00 120%)',
    glowColor: '#FFAA00',
    textColor: '#fff',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61577038593159',
    icon: <FacebookIcon size={24} />,
    gradient: 'linear-gradient(135deg, #1877F2 0%, #42A5F5 100%)',
    hoverGradient: 'linear-gradient(135deg, #1877F2 20%, #42A5F5 120%)',
    glowColor: '#1877F2',
    textColor: '#fff',
  },
  {
    label: 'King Street Cowboys Merch',
    href: 'https://kingstreetcowboys.com/affiliates/trevorbfit',
    icon: <NetworkIcon size={24} />,
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FF6B00 100%)',
    hoverGradient: 'linear-gradient(135deg, #F59E0B 20%, #FF6B00 120%)',
    glowColor: '#F59E0B',
    textColor: '#fff',
  },
  {
    label: 'Cameo',
    href: 'https://www.cameo.com/trevor_bfit',
    icon: <NetworkIcon size={24} />,
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    hoverGradient: 'linear-gradient(135deg, #7C3AED 20%, #A855F7 120%)',
    glowColor: '#7C3AED',
    textColor: '#fff',
  },
];

export default function LinkTree() {
  useScrollDepth();
  // const { showToast, ComingSoonSnackbar } = useComingSoonToast();
  const { isInAppBrowser, platform, copyToClipboard } = useInAppBrowser();
  const [copySnackbar, setCopySnackbar] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: '' });

  const handleLinkClick = useCallback(
    async (
      e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
      link: LinkItem,
      index: number
    ) => {
      const isExternal = link.href.startsWith('http');
      trackLinkClick(link.label, link.href, index, isExternal);

      if (link.href.includes('tiktok.com')) {
        trackSocialClick('tiktok', 'linktree');
      } else if (link.href.includes('youtube.com')) {
        trackSocialClick('youtube', 'linktree');
      } else if (link.href.includes('instagram.com')) {
        trackSocialClick('instagram', 'linktree');
      } else if (link.href.includes('amazon.com')) {
        trackSocialClick('amazon', 'linktree');
      }

      if (isInAppBrowser && isExternal && isProblematicUrl(link.href)) {
        const copied = await copyToClipboard(link.href);
        if (copied) {
          trackInAppBrowserLinkCopied(link.label, link.href, platform);
          setCopySnackbar({
            open: true,
            message: 'Link copied! Paste in your browser for best results.',
          });
        }
      }
    },
    [isInAppBrowser, platform, copyToClipboard]
  );

  const handleCloseCopySnackbar = useCallback(() => {
    setCopySnackbar({ open: false, message: '' });
  }, []);

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
                    background: `linear-gradient(135deg, #F59E0B, #DC2626, #40E0D0)`,
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
                    src="/images/trevor-profile.png"
                    alt="Trevor"
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
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.neon} 100%)`,
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
                Connect with Trevor - Ranch Squad Commander • TikTok LIVE Pro.
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
                  onClick={(e) => handleLinkClick(e, link, index)}
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

          {/* Ranch Squad Section */}
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
                Official Merch
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
                Rep the Ranch Squad with official gear from King Street Cowboys.
                Built for cowboys who ain&apos;t fake.
              </Typography>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  href="https://kingstreetcowboys.com/affiliates/trevorbfit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={async () => {
                    const url = 'https://kingstreetcowboys.com/affiliates/trevorbfit';
                    trackLinkClick(
                      'Shop King Street Cowboys',
                      url,
                      links.length,
                      true
                    );

                    if (isInAppBrowser && isProblematicUrl(url)) {
                      const copied = await copyToClipboard(url);
                      if (copied) {
                        trackInAppBrowserLinkCopied(
                          'Shop King Street Cowboys',
                          url,
                          platform
                        );
                        setCopySnackbar({
                          open: true,
                          message:
                            'Link copied! Paste in your browser for best results.',
                        });
                      }
                    }
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
                  Shop King Street Cowboys
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
              &quot;Com&apos;On... Gooder Than Shit!&quot;
            </Typography>
          </motion.div>
        </Container>
      </Box>
      {/* <ComingSoonSnackbar /> */}
      <Snackbar
        open={copySnackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseCopySnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseCopySnackbar}
          severity="info"
          variant="filled"
          icon={<ContentCopyIcon fontSize="small" />}
          sx={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            color: '#fff',
            fontWeight: 600,
          }}
        >
          {copySnackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
