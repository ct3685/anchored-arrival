'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors } from '@/theme/theme';
import { trackLinkClick } from '@/lib/analytics';
import { NetworkIcon } from '@/components/Icons';

export default function CreatorNetworkCTA() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.surface} 50%, ${colors.background} 100%)`,
        borderTop: `1px solid ${colors.gold}22`,
        borderBottom: `1px solid ${colors.gold}22`,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack alignItems="center" spacing={3}>
            {/* Icon */}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${colors.gold}33 0%, ${colors.gold}11 100%)`,
                border: `2px solid ${colors.gold}44`,
                color: colors.gold,
              }}
            >
              <NetworkIcon />
            </Box>

            {/* Heading */}
            <Typography
              variant="overline"
              sx={{
                color: colors.gold,
                letterSpacing: 4,
                fontWeight: 600,
              }}
            >
              For Creators
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                color: colors.text,
              }}
            >
              Join My Creator Network
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: colors.textSecondary,
                maxWidth: 400,
                lineHeight: 1.7,
              }}
            >
              Are you a TikTok creator? Get daily 1-on-1 support, LIVE skills
              training, and opportunities to grow with the Recapture Live Stream
              network.
            </Typography>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                variant="contained"
                size="large"
                href="https://www.tiktok.com/t/ZTh1ohJwM/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackLinkClick(
                    'Join My Creator Network',
                    'https://www.tiktok.com/t/ZTh1ohJwM/',
                    0,
                    true
                  );
                }}
                sx={{
                  py: 1.5,
                  px: 4,
                  color: colors.background,
                  background: `linear-gradient(135deg, ${colors.gold} 0%, #FFA500 100%)`,
                  boxShadow: `0 0 25px ${colors.gold}44`,
                  fontSize: '1rem',
                  fontWeight: 700,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${colors.gold} 20%, #FFA500 120%)`,
                    boxShadow: `0 0 35px ${colors.gold}66`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Apply to Join
              </Button>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
