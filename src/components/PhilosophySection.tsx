'use client';

import { Box, Typography, Container, Button } from '@mui/material';
import Link from 'next/link';
import { colors, sectionSpace } from '@/theme/theme';

export default function PhilosophySection() {
  return (
    <Box
      component="section"
      aria-labelledby="philosophy-heading"
      sx={{
        py: sectionSpace.y,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
            gap: { xs: 4, md: 8 },
            alignItems: 'start',
          }}
        >
          <Typography
            id="philosophy-heading"
            sx={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: colors.clayDeep,
              fontWeight: 600,
              writingMode: { xs: 'horizontal-tb', md: 'vertical-rl' },
              transform: { md: 'rotate(180deg)' },
              whiteSpace: 'nowrap',
              pt: { md: 1 },
            }}
          >
            Philosophy
          </Typography>

          <Box sx={{ maxWidth: { md: 720 } }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: 'clamp(2.25rem, 3.5vw, 3.25rem)' },
                color: colors.espresso,
                mb: 3,
                fontWeight: 600,
              }}
            >
              Birth is not a performance. It is a passage.
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-sans)',
                fontSize: { xs: '1.05rem', md: '1.125rem' },
                color: colors.warmGray,
                lineHeight: 1.75,
                mb: 3,
              }}
            >
              My work is to help you stay tethered to your own knowing—through education that respects
              your intelligence, advocacy that honors your voice, and a steady presence when the room
              gets loud.
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                fontSize: { xs: '1.12rem', md: '1.22rem' },
                color: colors.charcoal,
                lineHeight: 1.65,
                borderLeft: `2px solid ${colors.gold}`,
                pl: 3,
                mb: 4,
              }}
            >
              Luxury, here, is not excess. It is clarity, slowness, and the relief of being held by
              someone who does not flinch.
            </Typography>
            <Button variant="text" color="primary" component={Link} href="/about" sx={{ px: 0 }}>
              Read the full story →
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
