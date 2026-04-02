import type { Metadata } from 'next';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for a consultation. In-home and Zoom appointments available.',
};

export default function ContactPage() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="sm">
        <Typography variant="h3" textAlign="center" sx={{ mb: 2 }}>
          Get in Touch
        </Typography>
        <Typography textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
          Ready to start your journey? We&apos;d love to hear from you. Reach out for a
          free initial consultation — available in-home or via Zoom.
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VideocamIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Box>
              <Typography variant="h6">Zoom Consultations Available</Typography>
              <Typography variant="body2" color="text.secondary">
                Can&apos;t meet in person? We offer virtual appointments for your convenience.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <ContactForm />
      </Container>
    </Box>
  );
}
