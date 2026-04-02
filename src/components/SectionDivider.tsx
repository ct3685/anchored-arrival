'use client';

import { Box } from '@mui/material';
import { colors } from '@/theme/theme';

interface SectionDividerProps {
  ornament?: boolean;
}

export default function SectionDivider({ ornament = true }: SectionDividerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2.5,
        py: { xs: 3, md: 5 },
        px: 4,
      }}
    >
      <Box
        sx={{
          flex: 1,
          maxWidth: 120,
          height: '1px',
          background: `linear-gradient(to right, transparent, ${colors.gold})`,
        }}
      />
      {ornament && (
        <Box
          component="svg"
          viewBox="0 0 24 24"
          sx={{
            width: 18,
            height: 18,
            color: colors.gold,
            opacity: 0.7,
            flexShrink: 0,
          }}
        >
          <path
            fill="currentColor"
            d="M12 2C12 2 9 6 9 10C9 12.5 10 14 10 14L8.5 18H10L11 15.5V22H13V15.5L14 18H15.5L14 14C14 14 15 12.5 15 10C15 6 12 2 12 2ZM12 4.5C12 4.5 13.5 7.5 13.5 10C13.5 11.5 13 12.5 12.5 13.2H11.5C11 12.5 10.5 11.5 10.5 10C10.5 7.5 12 4.5 12 4.5Z"
          />
          <path
            fill="currentColor"
            d="M7.5 10.5L5 9L7.5 11.5ZM16.5 10.5L19 9L16.5 11.5Z"
          />
        </Box>
      )}
      <Box
        sx={{
          flex: 1,
          maxWidth: 120,
          height: '1px',
          background: `linear-gradient(to left, transparent, ${colors.gold})`,
        }}
      />
    </Box>
  );
}
