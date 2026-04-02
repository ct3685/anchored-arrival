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
        placeholder="Due date or baby’s age, what you are weighing, what would help this week…"
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
        I usually reply within one business day. What you send stays here—no marketing lists, no
        sharing without your OK.
      </Typography>
    </Box>
  );
}
