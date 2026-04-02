'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function Hero() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #A8C5AB 0%, #E8B4B8 50%, #FDF8F0 100%)',
        py: { xs: 10, md: 16 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '2.2rem', md: '3.5rem' }, mb: 2, color: '#2C2C2C' }}
        >
          Supporting You Through Every Step of Motherhood
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', mb: 4, fontFamily: 'var(--font-body)', fontWeight: 400 }}
        >
          Compassionate doula care, birth education, lactation support, and postpartum
          wellness — because no one should navigate this journey alone.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary" component={Link} href="/services" size="large">
            Explore Services
          </Button>
          <Button variant="outlined" color="primary" component={Link} href="/contact" size="large">
            Book a Consultation
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
