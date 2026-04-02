'use client';

import { Box, Typography, TextField, Button } from '@mui/material';
import { colors } from '@/theme/theme';

export function ContactForm() {
  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}
      onSubmit={(e: React.FormEvent) => e.preventDefault()}
    >
      <TextField
        label="Full Name"
        fullWidth
        required
        variant="standard"
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        required
        variant="standard"
      />
      <TextField
        label="Phone (optional)"
        fullWidth
        variant="standard"
      />
      <TextField
        label="Tell us about your needs"
        multiline
        rows={4}
        fullWidth
        variant="standard"
        placeholder="Due date, services you're interested in, questions..."
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        sx={{
          mt: 1,
          alignSelf: 'center',
          px: 6,
          py: 1.8,
        }}
      >
        Send Message
      </Button>
      <Typography
        sx={{
          fontFamily: 'var(--font-accent)',
          fontStyle: 'italic',
          fontSize: '0.88rem',
          color: colors.warmGray,
          textAlign: 'center',
        }}
      >
        We typically respond within 24 hours. Your information is kept strictly
        confidential.
      </Typography>
    </Box>
  );
}
