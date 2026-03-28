'use client';

import { Box, Button, Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Link
          href="/"
          style={{ display: 'block', width: '100%', maxWidth: 400 }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3/4',
              mb: 4,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <Image
              src="/images/trevor-main.jpg"
              alt="404 - Page not found - Ranch Squad"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
        </Link>

        <Button
          component={Link}
          href="/"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
          sx={{
            px: 5,
            py: 1.5,
            fontSize: '1.1rem',
          }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}
