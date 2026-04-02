'use client';

import { Box, Typography, Container, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        bgcolor: '#5C7E60',
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontFamily: 'var(--font-display)', mb: 1 }}>
              Anchored Arrival
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, fontStyle: 'italic' }}>
              Strong, steady support for a confident birth
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Services', 'About', 'Contact'].map((item) => (
              <MuiLink
                key={item}
                component={Link}
                href={`/${item.toLowerCase()}`}
                sx={{ color: '#fff', opacity: 0.85, textDecoration: 'none', '&:hover': { opacity: 1 } }}
              >
                {item}
              </MuiLink>
            ))}
          </Box>
        </Box>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', pt: 3 }}>
          <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 1 }}>
            Disclaimer: The services provided are not a substitute for professional medical
            advice, diagnosis, or treatment. Always seek the advice of your physician or
            other qualified health provider with any questions regarding a medical condition.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
            © {new Date().getFullYear()} Anchored Arrival. All rights reserved.
            Your privacy is important to us.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
