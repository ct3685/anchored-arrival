'use client';

import { Box, Typography, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { motion, AnimatePresence } from 'motion/react';
import { colors } from '@/theme/theme';
import { useInAppBrowser, InAppBrowserPlatform } from '@/lib/useInAppBrowser';
import {
  trackInAppBrowserDetected,
  trackInAppBrowserNoticeDismissed,
} from '@/lib/analytics';
import { useEffect, useRef } from 'react';

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

  const handleDismiss = () => {
    trackInAppBrowserNoticeDismissed(platform);
    dismiss();
  };

  const showNotice = isInAppBrowser && !dismissed;
  const accentColor = platformColors[platform] || colors.primary;

  return (
    <AnimatePresence>
      {showNotice && (
        <Collapse in={showNotice}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.background} 100%)`,
                borderBottom: `2px solid ${accentColor}44`,
                px: 2,
                py: 1.5,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                position: 'relative',
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${accentColor}22`,
                  border: `1px solid ${accentColor}44`,
                  color: accentColor,
                  flexShrink: 0,
                  mt: 0.25,
                }}
              >
                <OpenInBrowserIcon fontSize="small" />
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: colors.text,
                    mb: 0.25,
                    lineHeight: 1.3,
                  }}
                >
                  Open in Browser for Best Experience
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.textSecondary,
                    lineHeight: 1.4,
                    fontSize: '0.8rem',
                  }}
                >
                  {instructions}
                </Typography>
              </Box>

              {/* Close button */}
              <IconButton
                size="small"
                onClick={handleDismiss}
                aria-label="Dismiss notice"
                sx={{
                  color: colors.textSecondary,
                  p: 0.5,
                  '&:hover': {
                    color: colors.text,
                    background: `${colors.text}11`,
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </motion.div>
        </Collapse>
      )}
    </AnimatePresence>
  );
}
