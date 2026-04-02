import type { Metadata } from 'next';
import { Box, Typography, Container } from '@mui/material';
import { colors } from '@/theme/theme';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Request a consultation. In-home or Zoom. Replies are confidential and unhurried.',
};

export default function ContactPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 560, mx: 'auto' }}>
          <Typography
            sx={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: colors.bronzeMuted,
              fontWeight: 600,
              textAlign: 'center',
              mb: 2,
            }}
          >
            Contact
          </Typography>

          <Typography
            variant="h2"
            textAlign="center"
            sx={{
              mb: 2,
              fontSize: { xs: '2rem', md: '2.65rem' },
              color: colors.espresso,
              fontWeight: 600,
              lineHeight: 1.12,
            }}
          >
            Say where you are. We will take it from there.
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontSize: { xs: '1.05rem', md: '1.12rem' },
              color: 'text.secondary',
              mb: 5,
              lineHeight: 1.72,
            }}
          >
            Pregnant, planning, or already home with a newborn. First consults are slow on purpose,
            in person or on Zoom.
          </Typography>

          <Box
            sx={{
              bgcolor: 'background.paper',
              p: { xs: 3.5, md: 5 },
              border: `1px solid rgba(58,53,48,0.07)`,
              boxShadow: '0 20px 48px rgba(30,26,23,0.05)',
            }}
          >
            <ContactForm />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
