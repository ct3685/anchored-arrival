'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import AnchorIcon from '@mui/icons-material/Anchor';
import Link from 'next/link';

export default function Hero() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(160deg, #A8C5AB 0%, #D6E2D0 40%, #F5F0E8 75%, #FDF8F0 100%)',
        py: { xs: 10, md: 16 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <AnchorIcon sx={{ fontSize: 48, color: '#5C7E60', mb: 2, opacity: 0.7 }} />
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '2.8rem', md: '4.2rem' }, mb: 1, color: '#2C2C2C' }}
        >
          Anchored Arrival
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#5C7E60',
            mb: 3,
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.02em',
          }}
        >
          Strong, steady support for a confident birth
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
