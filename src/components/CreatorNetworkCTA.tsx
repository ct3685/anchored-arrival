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
import { colors, clipPaths } from '@/theme/theme';
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
          py: { xs: 8, md: 10 },
          background: `linear-gradient(180deg, ${colors.smokeBlack} 0%, ${colors.darkLeather} 50%, ${colors.smokeBlack} 100%)`,
          borderTop: `1px solid ${colors.brass}22`,
          borderBottom: `1px solid ${colors.brass}22`,
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <Stack alignItems="center" spacing={3}>
              <Typography
                variant="overline"
                sx={{
                  color: colors.brass,
                  letterSpacing: 6,
                  fontWeight: 600,
                  fontSize: '0.8rem',
                }}
              >
                Official Uniform
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  textAlign: 'center',
                  color: colors.amber,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: `0 0 30px ${colors.amber}22`,
                }}
              >
                Suit Up
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: colors.dust,
                  maxWidth: 440,
                  lineHeight: 1.7,
                }}
              >
                Rep the Ranch Squad with official gear from King Street Cowboys.
                Hats, tees, and gear built for cowboys who ain&apos;t fake.
              </Typography>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="https://kingstreetcowboys.com/affiliates/trevorbfit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1.1rem',
                    clipPath: clipPaths.ticketStub,
                    border: 'none',
                  }}
                >
                  Shop the Gear
                </Button>
              </motion.div>

              {/* Promo code stamps */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mt: 2 }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    border: `1px dashed ${colors.brass}66`,
                    backgroundColor: `${colors.darkLeather}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.dust,
                      letterSpacing: '0.06em',
                    }}
                  >
                    @buckedup CODE:{' '}
                    <Box
                      component="span"
                      sx={{ color: colors.amber, fontWeight: 700 }}
                    >
                      Trevorb20
                    </Box>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    border: `1px dashed ${colors.brass}66`,
                    backgroundColor: `${colors.darkLeather}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.dust,
                      letterSpacing: '0.06em',
                    }}
                  >
                    @rockandrolldenim CODE:{' '}
                    <Box
                      component="span"
                      sx={{ color: colors.amber, fontWeight: 700 }}
                    >
                      Trevorb20
                    </Box>
                  </Typography>
                </Box>
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
