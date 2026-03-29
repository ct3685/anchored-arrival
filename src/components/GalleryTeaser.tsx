'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'motion/react';
import { colors, clipPaths } from '@/theme/theme';
import { trackTeaserCTA } from '@/lib/analytics';
import { galleryImages } from '@/lib/images';

export default function GalleryTeaser() {
  const featured = galleryImages.slice(0, 4);

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        background: `linear-gradient(180deg, ${colors.smokeBlack} 0%, ${colors.coalBrown} 100%)`,
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
            Scenes From the Ranch
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
            Proof of Life
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {featured.map((image, index) => (
            <Grid size={{ xs: 6, md: index === 0 ? 6 : 2 }} key={image.src}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: index === 0 ? '4/3' : '3/4',
                    clipPath: clipPaths.cattleTag,
                    overflow: 'hidden',
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                    '&:hover .overlay': {
                      opacity: 1,
                    },
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    sizes={
                      index === 0
                        ? '(max-width: 900px) 100vw, 50vw'
                        : '(max-width: 600px) 50vw, 17vw'
                    }
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, ${colors.smokeBlack}CC 0%, transparent 50%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.bone,
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {image.title}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            style={{ display: 'inline-block' }}
          >
            <Button
              component={Link}
              href="/gallery"
              variant="contained"
              color="primary"
              onClick={() => trackTeaserCTA('View Full Gallery', '/gallery')}
              sx={{
                clipPath: clipPaths.ticketStub,
                border: 'none',
                px: 5,
                py: 1.5,
              }}
            >
              View Full Gallery
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
