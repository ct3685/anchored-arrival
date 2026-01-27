'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors } from '@/theme/theme';
import { trackHeroCTA, trackSocialClick } from '@/lib/analytics';

// TikTok icon component
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// YouTube icon component
const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Snapchat icon component
const SnapchatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.732-.271-1.273-.63-1.273-1.096-.014-.46.39-.818.943-.904.074-.016.18-.016.255-.016.21 0 .42.045.615.135.36.181.72.285 1.02.285.181 0 .315-.044.405-.074l-.016-.404c-.104-1.628-.239-3.654.29-4.848C7.861 1.068 11.216.793 12.206.793z" />
  </svg>
);

// Instagram icon component
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

// Gallery icon component
const GalleryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
  </svg>
);

export default function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `radial-gradient(ellipse at center, ${colors.surface} 0%, ${colors.background} 70%)`,
        overflow: 'hidden'
      }}>
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
          filter: 'blur(60px)'
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
          filter: 'blur(80px)'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 4, md: 0 } }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems="center"
          justifyContent="center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}>
            <Box
              sx={{
                'position': 'relative',
                'width': { xs: 280, md: 350 },
                'height': { xs: 280, md: 350 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                  animation: 'spin 4.5s linear infinite'
                },
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                }
              }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `4px solid ${colors.background}`
                }}>
                <Image
                  src="/images/main-character.png"
                  alt="Agent Morgie"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Box>
            </Box>
          </motion.div>

          {/* Text Content */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 500 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: colors.secondary,
                  letterSpacing: 4,
                  fontWeight: 600,
                  mb: 1,
                  display: 'block'
                }}>
                WELCOME TO THE WORLD OF
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}>
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
                  lineHeight: 1.1
                }}>
                Agent Morgie
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  color: colors.gold,
                  mb: 2
                }}>
                00BA
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}>
              <Typography
                variant="h5"
                sx={{
                  color: colors.textSecondary,
                  fontWeight: 400,
                  mb: 2,
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}>
                Double O Badass • Main Character Energy • Live... And Lethal
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}>
              <Typography
                variant="body1"
                sx={{
                  color: colors.textSecondary,
                  fontWeight: 400,
                  mb: 4,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  lineHeight: 1.7,
                  maxWidth: 450
                }}>
                Candid, community-driven creator focused on real conversations, growth, and
                connection. TikTok Lives, relatable humor, mindset/faith moments, and everyday
                lifestyle—building a welcoming space where people can be genuine, have fun, and feel
                at home.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}>
              <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: 450 } }}>
                {/* View Gallery - Full Width Featured CTA */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  style={{ marginBottom: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    component={Link}
                    href="/gallery"
                    startIcon={<GalleryIcon />}
                    onClick={() => trackHeroCTA('View Gallery', '/gallery', false)}
                    sx={{
                      'py': 1.5,
                      'background': `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                      'boxShadow': `0 0 20px ${colors.primary}44`,
                      'backdropFilter': 'blur(8px)',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary} 20%, ${colors.accent} 120%)`,
                        boxShadow: `0 0 30px ${colors.primary}66`
                      },
                      'transition': 'all 0.2s ease'
                    }}>
                    View Gallery
                  </Button>
                </motion.div>

                {/* Social Buttons Grid - 2x2 on desktop, stacked on mobile */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 1.5
                  }}>
                  {/* TikTok Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
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
                        'color': '#fff',
                        'background': 'linear-gradient(135deg, #00F2EA 0%, #FF0050 100%)',
                        'backdropFilter': 'blur(8px)',
                        'boxShadow': '0 0 20px #00F2EA44',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #00F2EA 20%, #FF0050 120%)',
                          boxShadow: '0 0 30px #FF005066'
                        },
                        'transition': 'all 0.2s ease'
                      }}>
                      TikTok
                    </Button>
                  </motion.div>

                  {/* YouTube Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
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
                        'color': '#fff',
                        'background': 'linear-gradient(135deg, #FF0000 0%, #FFAA00 100%)',
                        'backdropFilter': 'blur(8px)',
                        'boxShadow': '0 0 20px #FF000044',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #FF0000 20%, #FFAA00 120%)',
                          boxShadow: '0 0 30px #FFAA0066'
                        },
                        'transition': 'all 0.2s ease'
                      }}>
                      YouTube
                    </Button>
                  </motion.div>

                  {/* Snapchat Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      href="https://www.snapchat.com/add/morg10_yo"
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<SnapchatIcon />}
                      onClick={() => {
                        trackHeroCTA(
                          'Add on Snapchat',
                          'https://www.snapchat.com/add/morg10_yo',
                          true
                        );
                        trackSocialClick('snapchat', 'hero');
                      }}
                      sx={{
                        'color': '#000',
                        'background': 'linear-gradient(135deg, #FFFC00 0%, #00D4AA 100%)',
                        'backdropFilter': 'blur(8px)',
                        'boxShadow': '0 0 20px #FFFC0044',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #FFFC00 20%, #00D4AA 120%)',
                          boxShadow: '0 0 30px #00D4AA66'
                        },
                        'transition': 'all 0.2s ease'
                      }}>
                      Snapchat
                    </Button>
                  </motion.div>

                  {/* Instagram Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      href="https://www.instagram.com/agentmorgan1000"
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<InstagramIcon />}
                      onClick={() => {
                        trackHeroCTA(
                          'Follow on Instagram',
                          'https://www.instagram.com/agentmorgan1000',
                          true
                        );
                        trackSocialClick('instagram', 'hero');
                      }}
                      sx={{
                        'color': '#fff',
                        'background': 'linear-gradient(135deg, #E1306C 0%, #C13584 50%, #833AB4 100%)',
                        'backdropFilter': 'blur(8px)',
                        'boxShadow': '0 0 20px #E1306C44',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #E1306C 20%, #C13584 60%, #833AB4 120%)',
                          boxShadow: '0 0 30px #E1306C66'
                        },
                        'transition': 'all 0.2s ease'
                      }}>
                      Instagram
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
