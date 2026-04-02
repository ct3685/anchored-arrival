'use client';

import { Box, Typography, Container, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { colors } from '@/theme/theme';

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 7, md: 9 },
        bgcolor: colors.ink,
        color: colors.ivory,
        borderTop: `1px solid rgba(212,201,168,0.12)`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'space-between',
            gap: { xs: 4, md: 0 },
            mb: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* Logo + tagline */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Image
              src="/logo.png"
              alt="Anchored Arrival"
              width={56}
              height={56}
              style={{ objectFit: 'contain', opacity: 0.9, marginBottom: 12 }}
            />
            <Typography
              sx={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(250,246,241,0.5)',
                mb: 0.5,
              }}
            >
              Doula care & maternal support
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                fontSize: '1.02rem',
                color: colors.goldLight,
                mb: 1,
                opacity: 0.92,
              }}
            >
              Grounded&ensp;&middot;&ensp;Sacred&ensp;&middot;&ensp;Becoming
            </Typography>
          </Box>

          {/* Nav links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: { xs: 2, sm: 4 },
            }}
          >
            {footerLinks.map((item) => (
              <MuiLink
                key={item.label}
                component={Link}
                href={item.href}
                sx={{
                  color: colors.ivory,
                  opacity: 0.7,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.3s ease, color 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    color: colors.gold,
                  },
                }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Box>
        </Box>

        {/* Gold divider */}
        <Box
          sx={{
            height: '1px',
            background: `linear-gradient(to right, transparent, ${colors.gold}40, transparent)`,
            mb: 3,
          }}
        />

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            opacity: 0.5,
            mb: 1.5,
            fontSize: '0.75rem',
            lineHeight: 1.7,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Disclaimer: The services provided are not a substitute for
          professional medical advice, diagnosis, or treatment. Always seek the
          advice of your physician or other qualified health provider with any
          questions regarding a medical condition.
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            opacity: 0.45,
            fontSize: '0.75rem',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          &copy; {new Date().getFullYear()} Anchored Arrival. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
}
