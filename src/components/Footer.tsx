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
        position: 'relative',
        zIndex: 1,
        isolation: 'isolate',
        py: { xs: 7, md: 9 },
        backgroundColor: `${colors.ink} !important`,
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
              src="/images/logo.png"
              alt="Anchored Arrival"
              width={56}
              height={56}
              style={{ objectFit: 'contain', opacity: 0.9, marginBottom: 12 }}
            />
            <Typography
              sx={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(250,246,241,0.82)',
                mb: 0.5,
              }}
            >
              Doula care & maternal support
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: colors.goldLight,
                mb: 1,
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
                  color: 'rgba(250,246,241,0.92)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                  '&:hover': {
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
          component="p"
          sx={{
            display: 'block',
            mb: 1.5,
            fontSize: '0.8125rem',
            lineHeight: 1.65,
            fontFamily: 'var(--font-body)',
            color: 'rgba(250,246,241,0.82)',
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: { md: 'min(100%, 52rem)' },
          }}
        >
          Disclaimer: The services provided are not a substitute for
          professional medical advice, diagnosis, or treatment. Always seek the
          advice of your physician or other qualified health provider with any
          questions regarding a medical condition.
        </Typography>

        <Typography
          variant="caption"
          component="p"
          sx={{
            display: 'block',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-body)',
            color: 'rgba(250,246,241,0.72)',
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
