'use client';

import { Box, Typography, TextField, Button } from '@mui/material';

export function ContactForm() {
  return (
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
  );
}
