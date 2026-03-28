'use client';

import { useState, useCallback } from 'react';
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
import { trackLinkClick, trackInAppBrowserLinkCopied } from '@/lib/analytics';
import { useInAppBrowser, isProblematicUrl } from '@/lib/useInAppBrowser';

export default function CreatorNetworkCTA() {
  const { isInAppBrowser, platform, copyToClipboard } = useInAppBrowser();
  const [copySnackbar, setCopySnackbar] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: '' });

  const handleCloseCopySnackbar = useCallback(() => {
    setCopySnackbar({ open: false, message: '' });
  }, []);

  const handleClick = async () => {
    const url = 'https://kingstreetcowboys.com/affiliates/trevorbfit';
    trackLinkClick('Shop King Street Cowboys', url, 0, true);

    if (isInAppBrowser && isProblematicUrl(url)) {
      const copied = await copyToClipboard(url);
      if (copied) {
        trackInAppBrowserLinkCopied('Shop King Street Cowboys', url, platform);
        setCopySnackbar({
          open: true,
          message: 'Link copied! Paste in your browser for best results.',
        });
      }
    }
  };

  return (
    <>
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
              <Typography
                sx={{
                  fontSize: '3rem',
                }}
              >
                🤠
              </Typography>

              <Typography
                variant="overline"
                sx={{
                  color: colors.gold,
                  letterSpacing: 4,
                  fontWeight: 600,
                }}
              >
                Official Merch
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                  color: colors.text,
                }}
              >
                King Street Cowboys
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: colors.textSecondary,
                  maxWidth: 400,
                  lineHeight: 1.7,
                }}
              >
                Rep the Ranch Squad with official merch from King Street Cowboys.
                Hats, tees, and gear built for cowboys who ain&apos;t fake.
                Com&apos;On — you know you want to.
              </Typography>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  href="https://kingstreetcowboys.com/affiliates/trevorbfit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
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
                  Shop Now
                </Button>
              </motion.div>

              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <Typography
                  variant="caption"
                  sx={{ color: colors.textSecondary }}
                >
                  @buckedup CODE: <strong>Trevorb20</strong>
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: colors.textSecondary }}
                >
                  @rockandrolldenim CODE: <strong>Trevorb20</strong>
                </Typography>
              </Stack>
            </Stack>
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
