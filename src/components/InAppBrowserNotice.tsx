'use client';

import { Box, Typography, Button, Modal, Backdrop } from '@mui/material';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { motion, AnimatePresence } from 'motion/react';
import { colors } from '@/theme/theme';
import { useInAppBrowser, InAppBrowserPlatform } from '@/lib/useInAppBrowser';
import {
  trackInAppBrowserDetected,
  trackInAppBrowserNoticeDismissed,
} from '@/lib/analytics';
import { useEffect, useRef } from 'react';

const platformNames: Record<InAppBrowserPlatform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
  snapchat: 'Snapchat',
  twitter: 'X (Twitter)',
  linkedin: 'LinkedIn',
  unknown: 'this app',
};

const platformColors: Record<InAppBrowserPlatform, string> = {
  tiktok: '#00F2EA',
  instagram: '#E1306C',
  facebook: '#1877F2',
  snapchat: '#FFFC00',
  twitter: '#1DA1F2',
  linkedin: '#0A66C2',
  unknown: colors.primary,
};

export default function InAppBrowserNotice() {
  const { isInAppBrowser, platform, os, instructions, dismissed, dismiss } =
    useInAppBrowser();
  const hasTrackedRef = useRef(false);

  // Track when in-app browser is detected (only once)
  useEffect(() => {
    if (isInAppBrowser && !hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackInAppBrowserDetected(platform, os);
    }
  }, [isInAppBrowser, platform, os]);

  const handleContinue = () => {
    trackInAppBrowserNoticeDismissed(platform);
    dismiss();
  };

  const showNotice = isInAppBrowser && !dismissed;
  const accentColor = platformColors[platform] || colors.primary;
  const platformName = platformNames[platform] || 'this app';
  const browserName = os === 'ios' ? 'Safari' : 'Chrome';

  return (
    <AnimatePresence>
      {showNotice && (
        <Modal
          open={showNotice}
          onClose={() => {}} // Prevent closing by clicking outside
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 300,
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
              },
            },
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
          >
            <Box
              sx={{
                background: `linear-gradient(180deg, ${colors.surface} 0%, ${colors.background} 100%)`,
                borderRadius: 3,
                border: `2px solid ${accentColor}66`,
                boxShadow: `0 0 40px ${accentColor}33, 0 20px 60px rgba(0,0,0,0.5)`,
                p: 3,
                maxWidth: 360,
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Accent glow at top */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${accentColor}, ${colors.primary}, ${accentColor})`,
                }}
              />

              {/* Warning Icon */}
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${accentColor}22`,
                  border: `2px solid ${accentColor}44`,
                  color: accentColor,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <WarningAmberIcon sx={{ fontSize: 32 }} />
              </Box>

              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: colors.text,
                  mb: 1.5,
                  lineHeight: 1.2,
                }}
              >
                Heads Up!
              </Typography>

              {/* Main Message */}
              <Typography
                variant="body1"
                sx={{
                  color: colors.text,
                  mb: 2,
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                You&apos;re viewing this in{' '}
                <Box
                  component="span"
                  sx={{ color: accentColor, fontWeight: 700 }}
                >
                  {platformName}&apos;s browser
                </Box>
                . Some links (like Amazon, TikTok, etc.) may not work properly.
              </Typography>

              {/* Instructions Box */}
              <Box
                sx={{
                  background: `${colors.background}`,
                  border: `1px solid ${colors.text}22`,
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'center',
                    mb: 1,
                  }}
                >
                  <OpenInBrowserIcon
                    sx={{ color: accentColor, fontSize: 20 }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ color: colors.text, fontWeight: 700 }}
                  >
                    For Best Experience:
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.textSecondary,
                    lineHeight: 1.5,
                  }}
                >
                  {instructions}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleContinue}
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${colors.primary} 100%)`,
                    color: platform === 'snapchat' ? '#000' : '#fff',
                    boxShadow: `0 4px 20px ${accentColor}44`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${accentColor} 20%, ${colors.primary} 120%)`,
                      boxShadow: `0 6px 25px ${accentColor}66`,
                    },
                  }}
                >
                  Got It, Continue Anyway
                </Button>

                <Typography
                  variant="caption"
                  sx={{
                    color: colors.textSecondary,
                    display: 'block',
                  }}
                >
                  Or open{' '}
                  <Box
                    component="span"
                    sx={{ color: colors.text, fontWeight: 600 }}
                  >
                    agentmorgie.com
                  </Box>{' '}
                  directly in {browserName}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
