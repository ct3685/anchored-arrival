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
        label="What would help right now?"
        multiline
        rows={4}
        fullWidth
        variant="standard"
        placeholder="Timeline, what you are weighing, what you need from me…"
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        sx={{
          mt: 1,
          alignSelf: { xs: 'stretch', sm: 'center' },
          px: { xs: 4, sm: 6 },
          py: 1.8,
        }}
      >
        Send inquiry
      </Button>
      <Typography
        sx={{
          fontFamily: 'var(--font-accent)',
          fontStyle: 'italic',
          fontSize: '0.88rem',
          color: colors.warmGray,
          textAlign: 'center',
          lineHeight: 1.65,
        }}
      >
        Replies usually land within one business day. Nothing you share is used for marketing or
        passed along without your consent.
      </Typography>
    </Box>
  );
}
