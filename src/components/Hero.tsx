'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors, layout } from '@/theme/theme';
import { trackHeroCTA, trackSocialClick } from '@/lib/analytics';
import { useScrollDepth } from '@/lib/useScrollDepth';
import { useComingSoonToast } from '@/lib/useComingSoonToast';
import {
  TikTokIcon,
  YouTubeIcon,
  SnapchatIcon,
  InstagramIcon,
  GalleryIcon,
  AmazonIcon,
} from '@/components/Icons';

export default function Hero() {
  useScrollDepth();
  const { showToast, ComingSoonSnackbar } = useComingSoonToast();

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          minHeight: {
            xs: `calc(100dvh - ${layout.navbarHeight.xs}px)`,
            sm: `calc(100dvh - ${layout.navbarHeight.sm}px)`,
          },
          display: 'flex',
          alignItems: 'center',
          background: `radial-gradient(ellipse at center, ${colors.surface} 0%, ${colors.background} 70%)`,
          overflow: 'hidden',
        }}
      >
        {/* Gradient orbs background */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.primary}33 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.secondary}33 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,
            py: { xs: 4, sm: 5, md: 6 },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 280, md: 350 },
                  height: { xs: 280, md: 350 },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -4,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                    animation: 'spin 4.5s linear infinite',
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
                    border: `4px solid ${colors.background}`,
                  }}
                >
                  <Image
                    src="/images/mvp.png"
                    alt="Agent Morgie"
                    fill
                    sizes="(max-width: 768px) 280px, 350px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Box>
              </Box>
            </motion.div>

            {/* Text Content */}
            <Box
              sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 500 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: colors.secondary,
                    letterSpacing: 4,
                    fontWeight: 600,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  WELCOME TO THE WORLD OF
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                    lineHeight: 1.1,
                  }}
                >
                  Agent Morgie
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: colors.textSecondary,
                    fontWeight: 400,
                    mb: 2,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  Main Character Energy • LIVE Creator • Community Driven
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.textSecondary,
                    fontWeight: 400,
                    mb: 4,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    lineHeight: 1.7,
                    maxWidth: 450,
                  }}
                >
                  Candid, community-driven creator focused on real
                  conversations, growth, and connection. TikTok Lives, relatable
                  humor, mindset/faith moments, and everyday lifestyle—building
                  a welcoming space where people can be genuine, have fun, and
                  feel at home.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: 450 } }}>
                  {/* Social Buttons Grid - 2x3 on desktop, stacked on mobile */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 1.5,
                    }}
                  >
                    {/* TikTok Button */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        href="https://www.tiktok.com/@realfeelpurpose"
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<TikTokIcon />}
                        onClick={() => {
                          trackHeroCTA(
                            'Follow on TikTok',
                            'https://www.tiktok.com/@realfeelpurpose',
                            true
                          );
                          trackSocialClick('tiktok', 'hero');
                        }}
                        sx={{
                          color: '#fff',
                          background:
                            'linear-gradient(135deg, #00F2EA 0%, #FF0050 100%)',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 0 20px #00F2EA44',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #00F2EA 20%, #FF0050 120%)',
                            boxShadow: '0 0 30px #FF005066',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        TikTok
                      </Button>
                    </motion.div>

                    {/* Amazon Wishlist Button */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        href="https://www.amazon.com/hz/wishlist/ls/98CRSAC721IV?ref_=wl_share"
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<AmazonIcon />}
                        onClick={() => {
                          trackHeroCTA(
                            'Amazon Wishlist',
                            'https://www.amazon.com/hz/wishlist/ls/98CRSAC721IV?ref_=wl_share',
                            true
                          );
                        }}
                        sx={{
                          color: '#000',
                          background:
                            'linear-gradient(135deg, #FF9900 0%, #FF6600 100%)',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 0 20px #FF990044',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #FF9900 20%, #FF6600 120%)',
                            boxShadow: '0 0 30px #FF990066',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Wishlist
                      </Button>
                    </motion.div>

                    {/* YouTube Button */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        href="https://www.youtube.com/@AgentMorgan1000"
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<YouTubeIcon />}
                        onClick={() => {
                          trackHeroCTA(
                            'Subscribe on YouTube',
                            'https://www.youtube.com/@AgentMorgan1000',
                            true
                          );
                          trackSocialClick('youtube', 'hero');
                        }}
                        sx={{
                          color: '#fff',
                          background:
                            'linear-gradient(135deg, #FF0000 0%, #FFAA00 100%)',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 0 20px #FF000044',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #FF0000 20%, #FFAA00 120%)',
                            boxShadow: '0 0 30px #FFAA0066',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        YouTube
                      </Button>
                    </motion.div>

                    {/* Snapchat Button - Coming Soon */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<SnapchatIcon />}
                        onClick={() => showToast('Snapchat coming soon!')}
                        sx={{
                          color: '#000',
                          background:
                            'linear-gradient(135deg, #FFFC00 0%, #00D4AA 100%)',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 0 20px #FFFC0044',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #FFFC00 20%, #00D4AA 120%)',
                            boxShadow: '0 0 30px #00D4AA66',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Snapchat
                      </Button>
                    </motion.div>

                    {/* Instagram Button */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        href="https://www.instagram.com/AgentMorgie"
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<InstagramIcon />}
                        onClick={() => {
                          trackHeroCTA(
                            'Follow on Instagram',
                            'https://www.instagram.com/AgentMorgie',
                            true
                          );
                          trackSocialClick('instagram', 'hero');
                        }}
                        sx={{
                          color: '#fff',
                          background:
                            'linear-gradient(135deg, #E1306C 0%, #C13584 50%, #833AB4 100%)',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 0 20px #E1306C44',
                          '&:hover': {
                            background:
                              'linear-gradient(135deg, #E1306C 20%, #C13584 60%, #833AB4 120%)',
                            boxShadow: '0 0 30px #E1306C66',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Instagram
                      </Button>
                    </motion.div>

                    {/* View Gallery Button */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        component={Link}
                        href="/gallery"
                        startIcon={<GalleryIcon />}
                        onClick={() =>
                          trackHeroCTA('View Gallery', '/gallery', false)
                        }
                        sx={{
                          color: colors.background,
                          background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.neon} 100%)`,
                          backdropFilter: 'blur(8px)',
                          boxShadow: `0 0 20px ${colors.secondary}44`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${colors.secondary} 20%, ${colors.neon} 120%)`,
                            boxShadow: `0 0 30px ${colors.secondary}66`,
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Gallery
                      </Button>
                    </motion.div>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Stack>
        </Container>
      </Box>
      <ComingSoonSnackbar />
    </>
  );
}
