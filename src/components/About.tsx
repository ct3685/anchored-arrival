'use client';

import { Box, Typography, Container } from '@mui/material';

export default function About({ full = false }: { full?: boolean }) {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: full ? 'background.paper' : 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
          {full ? 'About Tender Beginnings' : 'Our Philosophy'}
        </Typography>
        <Typography sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
          At Tender Beginnings Wellness, we believe that every family deserves compassionate,
          informed support during one of life&apos;s most transformative experiences. Our mission is
          to empower birthing people with knowledge, comfort, and unwavering advocacy so they
          can approach pregnancy, birth, and postpartum with confidence.
        </Typography>
        {full && (
          <>
            <Typography sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
              Founded by Alissa Thorson, a certified doula passionate about maternal wellness,
              our practice offers a holistic approach that honors each family&apos;s unique
              journey. Whether you&apos;re a first-time parent or expanding your family, we
              provide personalized care tailored to your needs.
            </Typography>
            <Typography sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}>
              We offer both in-home visits and virtual consultations via Zoom, making expert
              support accessible no matter where you are. From birth education classes to
              lactation counseling and postpartum check-ins, we&apos;re with you every step
              of the way.
            </Typography>
          </>
        )}
      </Container>
    </Box>
  );
}
