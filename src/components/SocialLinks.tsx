'use client';

import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors, clipPaths } from '@/theme/theme';
import { trackSocialClick } from '@/lib/analytics';
import { useLiveStatus } from '@/lib/useLiveStatus';
import { TikTokIcon, InstagramIcon, FacebookIcon } from '@/components/Icons';

interface SocialCard {
  label: string;
  sublabel: string;
  href: string;
  icon: React.ReactNode;
  accentColor: string;
  featured?: boolean;
  analyticsId: string;
}

export default function SocialLinks() {
  const { isLive, tiktokHref } = useLiveStatus();

  const socialCards: SocialCard[] = [
    {
      label: 'TikTok @trevor_bfit',
      sublabel: isLive ? 'LIVE right now — pull up!' : '@trevor_bfit',
      href: tiktokHref,
      icon: <TikTokIcon size={28} />,
      accentColor: isLive ? colors.red : colors.amber,
      featured: true,
      analyticsId: 'tiktok',
    },
    {
      label: 'Instagram',
      sublabel: 'Daily chaos',
      href: 'https://www.instagram.com/trevor_bfit',
      icon: <InstagramIcon size={24} />,
      accentColor: colors.amber,
      analyticsId: 'instagram',
    },
    {
      label: 'Facebook',
      sublabel: 'Ranch Squad HQ',
      href: 'https://www.facebook.com/profile.php?id=61577038593159',
      icon: <FacebookIcon size={24} />,
      accentColor: colors.amber,
      analyticsId: 'facebook',
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        background: `linear-gradient(180deg, ${colors.smokeBlack} 0%, ${colors.coalBrown} 50%, ${colors.smokeBlack} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: colors.brass,
              display: 'block',
              textAlign: 'center',
              mb: 1,
              letterSpacing: 6,
              fontSize: '0.8rem',
            }}
          >
            Find the Chaos
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: colors.bone,
              textAlign: 'center',
              mb: 6,
              fontSize: { xs: '2rem', md: '2.8rem' },
            }}
          >
            Where to Find Trevor
          </Typography>
        </motion.div>

        <Grid container spacing={3} justifyContent="center">
          {socialCards.map((card, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: card.featured ? 6 : 3 }}
              key={card.analyticsId}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Box
                  component="a"
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackSocialClick(card.analyticsId, 'social_section')
                  }
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    position: 'relative',
                    p: card.featured ? 4 : 3,
                    clipPath: clipPaths.clippedCorner,
                    backgroundColor: colors.darkLeather,
                    border: `1px solid ${colors.brass}33`,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: colors.coalBrown,
                      boxShadow: `inset 0 0 30px ${card.accentColor}11, 0 0 20px ${card.accentColor}22`,
                      '& .card-icon': {
                        color: card.accentColor,
                      },
                      '& .card-label': {
                        color: card.accentColor,
                      },
                    },
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box
                      className="card-icon"
                      sx={{
                        color: colors.dust,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography
                      className="card-label"
                      variant={card.featured ? 'h4' : 'h5'}
                      sx={{
                        color: colors.bone,
                        transition: 'color 0.2s ease',
                        fontSize: card.featured
                          ? { xs: '1.6rem', md: '2rem' }
                          : { xs: '1.2rem', md: '1.4rem' },
                      }}
                    >
                      {card.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.dust,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {card.sublabel}
                    </Typography>
                  </Stack>

                  {/* LIVE NOW badge -- only shows when Trevor is actually streaming */}
                  {card.featured && isLive && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 24,
                        px: 1.5,
                        py: 0.5,
                        backgroundColor: colors.red,
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
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
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
