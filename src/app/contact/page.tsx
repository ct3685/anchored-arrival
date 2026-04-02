import type { Metadata } from 'next';
import { Box, Typography, Container, TextField, Button, Card, CardContent } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

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

        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
        >
          <TextField label="Full Name" fullWidth required />
          <TextField label="Email" type="email" fullWidth required />
          <TextField label="Phone (optional)" fullWidth />
          <TextField
            label="Tell us about your needs"
            multiline
            rows={4}
            fullWidth
            placeholder="Due date, services you're interested in, questions..."
          />
          <Button variant="contained" color="primary" size="large" type="submit">
            Send Message
          </Button>
          <Typography variant="caption" color="text.secondary" textAlign="center">
            We typically respond within 24 hours. Your information is kept strictly confidential.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
