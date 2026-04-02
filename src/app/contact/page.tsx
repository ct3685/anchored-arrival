import type { Metadata } from 'next';
import { Box, Typography, Container } from '@mui/material';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch for a consultation. In-home and Zoom appointments available.',
};

export default function ContactPage() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="sm">
        {/* Decorative ornament */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            component="svg"
            viewBox="0 0 24 24"
            sx={{
              width: 28,
              height: 28,
              color: 'secondary.main',
              opacity: 0.5,
            }}
          >
            <path
              fill="currentColor"
              d="M12 2C12 2 9 6 9 10C9 12.5 10 14 10 14L8.5 18H10L11 15.5V22H13V15.5L14 18H15.5L14 14C14 14 15 12.5 15 10C15 6 12 2 12 2Z"
            />
          </Box>
        </Box>

        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.6rem' } }}
        >
          Get in Touch
        </Typography>

        <Typography
          textAlign="center"
          sx={{
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
            fontSize: { xs: '1.05rem', md: '1.15rem' },
            color: 'text.secondary',
            mb: 6,
            lineHeight: 1.7,
          }}
        >
          Ready to start your journey? Reach out for a free initial
          consultation — available in-home or via Zoom.
        </Typography>

        <Box
          sx={{
            bgcolor: 'background.paper',
            p: { xs: 4, md: 5 },
            boxShadow: '0 2px 16px rgba(44,38,34,0.06)',
          }}
        >
          <ContactForm />
        </Box>
      </Container>
    </Box>
  );
}
