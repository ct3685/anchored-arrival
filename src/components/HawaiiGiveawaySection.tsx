'use client';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'motion/react';
import { colors } from '@/theme/theme';

export default function HawaiiGiveawaySection() {
  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${colors.background} 0%, #0a1628 50%, ${colors.background} 100%)`,
      }}
    >
      {/* Decorative glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.gold}18 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <Typography sx={{ fontSize: { xs: '3rem', sm: '4rem' }, lineHeight: 1 }}>
              🏝️
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: colors.neon,
                letterSpacing: 6,
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              SWEEPSTAKES
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, #FF9900 0%, ${colors.gold} 40%, ${colors.secondary} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', sm: '3rem' },
                lineHeight: 1.2,
              }}
            >
              Win a $4,999 Hawaii Dream Getaway Gift Card!
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: colors.textSecondary,
                maxWidth: 520,
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.15rem' },
                lineHeight: 1.8,
              }}
            >
              Upward and Recapture Live are giving one lucky winner a $4,999
              gift card — ready to fuel your ultimate Hawaiian getaway. 🌺
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                variant="contained"
                size="large"
                href="https://www.appupward.com/hawaii"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mt: 1,
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#000',
                  background: `linear-gradient(135deg, ${colors.gold} 0%, #FF9900 50%, ${colors.neon} 100%)`,
                  boxShadow: `0 0 30px ${colors.gold}44`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${colors.gold} 20%, #FF9900 60%, ${colors.neon} 120%)`,
                    boxShadow: `0 0 50px ${colors.gold}77`,
                  },
                }}
              >
                🌺 Enter the Giveaway
              </Button>
            </motion.div>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}
