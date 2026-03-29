'use client';

import { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { motion } from 'motion/react';
import { colors, clipPaths } from '@/theme/theme';
import {
  trackLinkClick,
  trackSocialClick,
  trackInAppBrowserLinkCopied,
} from '@/lib/analytics';
import { useScrollDepth } from '@/lib/useScrollDepth';
import { useInAppBrowser, isProblematicUrl } from '@/lib/useInAppBrowser';
import { useLiveStatus } from '@/lib/useLiveStatus';
import {
  TikTokIcon,
  YouTubeIcon,
  InstagramIcon,
  FacebookIcon,
  NetworkIcon,
} from '@/components/Icons';

interface LinkItem {
  label: string;
  sublabel: string;
  href: string;
  icon?: React.ReactNode;
  accentColor: string;
  category: 'main' | 'social' | 'gear';
  featured?: boolean;
}

const categories = [
  { key: 'main', label: 'Main Event' },
  { key: 'social', label: 'Socials' },
  { key: 'gear', label: 'Gear & Extras' },
] as const;

export default function LinkTree() {
  useScrollDepth();
  const { isInAppBrowser, platform, copyToClipboard } = useInAppBrowser();
  const { isLive, tiktokHref } = useLiveStatus();
  const [copySnackbar, setCopySnackbar] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: '' });

  const links: LinkItem[] = [
    {
      label: 'TikTok @trevor_bfit',
      sublabel: isLive ? 'LIVE right now — pull up!' : 'Daily chaos',
      href: tiktokHref,
      icon: <TikTokIcon size={24} />,
      accentColor: isLive ? colors.red : colors.amber,
      category: 'main',
      featured: true,
    },
    {
      label: 'Instagram @trevor_bfit',
      sublabel: 'Behind the scenes',
      href: 'https://www.instagram.com/trevor_bfit',
      icon: <InstagramIcon size={22} />,
      accentColor: colors.amber,
      category: 'social',
    },
    {
      label: 'YouTube',
      sublabel: 'Highlights and clips',
      href: 'https://www.youtube.com/channel/UCLi7yoT4PGBY2k0o5hGvDwg',
      icon: <YouTubeIcon size={22} />,
      accentColor: colors.amber,
      category: 'social',
    },
    {
      label: 'Facebook',
      sublabel: 'Ranch Squad HQ',
      href: 'https://www.facebook.com/profile.php?id=61577038593159',
      icon: <FacebookIcon size={22} />,
      accentColor: colors.amber,
      category: 'social',
    },
    {
      label: 'King Street Cowboys',
      sublabel: 'Official gear',
      href: 'https://kingstreetcowboys.com/affiliates/trevorbfit',
      icon: <NetworkIcon size={22} />,
      accentColor: colors.brass,
      category: 'gear',
    },
    {
      label: 'Cameo',
      sublabel: 'Personal shoutouts',
      href: 'https://www.cameo.com/trevor_bfit',
      icon: <NetworkIcon size={22} />,
      accentColor: colors.brass,
      category: 'gear',
    },
  ];

  const handleLinkClick = useCallback(
    async (
      e: React.MouseEvent<HTMLAnchorElement>,
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
          background: `linear-gradient(180deg, ${colors.smokeBlack} 0%, ${colors.coalBrown} 40%, ${colors.smokeBlack} 100%)`,
        }}
      >
        <Container maxWidth="sm">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Stack alignItems="center" spacing={1} sx={{ mb: 5 }}>
              <Typography
                variant="overline"
                sx={{
                  color: colors.brass,
                  letterSpacing: 6,
                  fontSize: '0.8rem',
                }}
              >
                Catch Trevor Out Here
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: colors.amber,
                  textAlign: 'center',
                  fontSize: { xs: '2.2rem', md: '3rem' },
                }}
              >
                Pull Up Anywhere
              </Typography>
            </Stack>
          </motion.div>

          {/* Categorized Links */}
          {categories.map((cat) => {
            const catLinks = links.filter((l) => l.category === cat.key);
            if (catLinks.length === 0) return null;

            return (
              <Box key={cat.key} sx={{ mb: 4 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: colors.dust,
                    letterSpacing: 4,
                    fontSize: '0.7rem',
                    display: 'block',
                    mb: 1.5,
                    pl: 1,
                  }}
                >
                  {cat.label}
                </Typography>
                <Stack spacing={1.5}>
                  {catLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.08 + 0.3,
                      }}
                    >
                      <Box
                        component="a"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          handleLinkClick(e, link, index)
                        }
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          textDecoration: 'none',
                          p: link.featured ? 3 : 2.5,
                          clipPath: link.featured
                            ? clipPaths.ticketStub
                            : clipPaths.clippedCornerSm,
                          backgroundColor: link.featured
                            ? colors.darkLeather
                            : colors.coalBrown,
                          border: `1px solid ${link.featured ? (isLive ? colors.red : colors.amber) : colors.brass}33`,
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: colors.darkLeather,
                            boxShadow: `inset 0 0 20px ${link.accentColor}11, 0 0 16px ${link.accentColor}22`,
                            '& .link-icon': {
                              color: link.accentColor,
                            },
                            '& .link-label': {
                              color: link.accentColor,
                            },
                          },
                        }}
                      >
                        <Box
                          className="link-icon"
                          sx={{
                            color: colors.dust,
                            transition: 'color 0.2s ease',
                            flexShrink: 0,
                          }}
                        >
                          {link.icon}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            className="link-label"
                            variant={link.featured ? 'h5' : 'h6'}
                            sx={{
                              color: colors.bone,
                              transition: 'color 0.2s ease',
                              fontSize: link.featured ? '1.3rem' : '1rem',
                            }}
                          >
                            {link.label}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: colors.dust,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {link.sublabel}
                          </Typography>
                        </Box>

                        {/* LIVE NOW badge -- only when actually streaming */}
                        {link.featured && isLive && (
                          <Box
                            sx={{
                              px: 1.5,
                              py: 0.4,
                              backgroundColor: colors.red,
                              color: '#fff',
                              fontSize: '0.6rem',
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              flexShrink: 0,
                              animation: 'flicker 2s ease-in-out infinite',
                              '@keyframes flicker': {
                                '0%, 100%': { opacity: 1 },
                                '50%': { opacity: 0.6 },
                              },
                            }}
                          >
                            Live Now
                          </Box>
                        )}
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            );
          })}

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Box
              sx={{
                mt: 4,
                pt: 4,
                borderTop: `1px solid ${colors.brass}22`,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: colors.dust,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                &quot;Com&apos;On... Gooder Than Shit!&quot;
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>
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
            background: `linear-gradient(135deg, ${colors.amber} 0%, ${colors.red} 100%)`,
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
