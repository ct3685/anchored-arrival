'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { motion } from 'motion/react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';

import { galleryImages, ImageData } from '@/lib/images';
import { colors } from '@/theme/theme';

interface PhotoGalleryProps {
  images?: ImageData[];
}

export default function PhotoGallery({ images = galleryImages }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleDownload = async (src: string, filename: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const lightboxSlides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.title,
    description: img.description,
  }));

  return (
    <Box
      sx={{
        py: 8,
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${colors.background} 0%, ${colors.surface} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 800,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Gallery
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 6, color: colors.textSecondary }}
          >
            The many vibes of Agent Morgie 00BA
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={image.src}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: '1',
                    '&:hover .overlay': {
                      opacity: 1,
                    },
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 0 30px ${colors.primary}44`,
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => openLightbox(index)}
                    sx={{ height: '100%' }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
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
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      />
                    </Box>

                    {/* Hover Overlay */}
                    <Box
                      className="overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to top, ${colors.background}EE 0%, transparent 50%)`,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: 'white', fontWeight: 700 }}
                      >
                        {image.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: colors.textSecondary }}
                      >
                        {image.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <IconButton
                          size="small"
                          sx={{
                            color: colors.secondary,
                            backgroundColor: `${colors.secondary}22`,
                            '&:hover': {
                              backgroundColor: `${colors.secondary}44`,
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(index);
                          }}
                        >
                          <ZoomInIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            color: colors.primary,
                            backgroundColor: `${colors.primary}22`,
                            '&:hover': {
                              backgroundColor: `${colors.primary}44`,
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const filename = image.src.split('/').pop() || 'image.png';
                            handleDownload(image.src, filename);
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Box>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Download All CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={() => {
              images.forEach((img) => {
                const filename = img.src.split('/').pop() || 'image.png';
                handleDownload(img.src, `agent-morgie-${filename}`);
              });
            }}
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              '&:hover': {
                borderColor: colors.secondary,
                color: colors.secondary,
                backgroundColor: `${colors.primary}11`,
              },
            }}
          >
            Download All Images
          </Button>
        </Box>
      </Container>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Zoom, Download]}
        styles={{
          container: { backgroundColor: `${colors.background}F5` },
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
      />
    </Box>
  );
}
