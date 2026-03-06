'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'motion/react';
import { colors } from '@/theme/theme';

const SESSION_KEY = 'hawaii-giveaway-dismissed';

export default function HawaiiGiveawayPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    // Small delay so it doesn't flash on page load
    const timer = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    sessionStorage.setItem(SESSION_KEY, '1');
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                background: `linear-gradient(160deg, ${colors.background} 0%, #0a1628 50%, ${colors.surface} 100%)`,
                border: `2px solid ${colors.secondary}55`,
                borderRadius: 4,
                overflow: 'visible',
                position: 'relative',
                boxShadow: `0 0 60px ${colors.secondary}33, 0 0 120px ${colors.primary}22`,
              },
            },
            backdrop: {
              sx: {
                backdropFilter: 'blur(6px)',
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            },
          }}
        >
          <IconButton
            onClick={handleClose}
            aria-label="Close"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: colors.textSecondary,
              zIndex: 10,
              '&:hover': { color: colors.text },
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent sx={{ textAlign: 'center', py: 5, px: { xs: 3, sm: 5 } }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '3rem', sm: '4rem' },
                  lineHeight: 1,
                  mb: 1,
                }}
              >
                🌺🏝️✈️
              </Typography>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: colors.neon,
                  letterSpacing: 6,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  display: 'block',
                  mb: 1,
                }}
              >
                SWEEPSTAKES
              </Typography>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(135deg, #FF9900 0%, ${colors.gold} 40%, ${colors.secondary} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.8rem', sm: '2.5rem' },
                  lineHeight: 1.2,
                  mb: 1.5,
                }}
              >
                Win a $4,999 Hawaii Dream Getaway Gift Card!
              </Typography>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: colors.textSecondary,
                  maxWidth: 380,
                  mx: 'auto',
                  mb: 4,
                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                  lineHeight: 1.7,
                }}
              >
                Upward and Recapture Live are giving one lucky winner a $4,999
                gift card — ready to fuel your ultimate Hawaiian getaway. 🌴
              </Typography>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
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
                    onClick={handleClose}
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#000',
                      background: `linear-gradient(135deg, ${colors.gold} 0%, #FF9900 50%, ${colors.neon} 100%)`,
                      boxShadow: `0 0 30px ${colors.gold}55`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${colors.gold} 20%, #FF9900 60%, ${colors.neon} 120%)`,
                        boxShadow: `0 0 50px ${colors.gold}88`,
                      },
                    }}
                  >
                    🌺 Enter the Giveaway
                  </Button>
                </motion.div>

                <Button
                  onClick={handleClose}
                  sx={{
                    color: colors.textSecondary,
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    '&:hover': { color: colors.text, background: 'transparent' },
                  }}
                >
                  Maybe later
                </Button>
              </Box>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
