'use client';

import { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

export function useComingSoonToast() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Coming soon!');

  const showToast = useCallback((customMessage?: string) => {
    setMessage(customMessage || 'Coming soon!');
    setOpen(true);
  }, []);

  const handleClose = useCallback(
    (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    },
    []
  );

  const ComingSoonSnackbar = () => (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity="info"
        variant="filled"
        sx={{
          background: 'linear-gradient(135deg, #FFFC00 0%, #00D4AA 100%)',
          color: '#000',
          fontWeight: 600,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return { showToast, ComingSoonSnackbar };
}
