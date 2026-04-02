'use client';

import { Box, Typography, Card, CardContent, Container, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SpaIcon from '@mui/icons-material/Spa';

const services = [
  {
    title: 'Doula Support',
    description:
      'Continuous emotional, physical, and informational support throughout your pregnancy, labor, and delivery.',
    icon: <FavoriteIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: 'Birth Education',
    description:
      'Comprehensive childbirth education classes available via Zoom, covering breathing techniques, labor stages, and birth planning.',
    icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: 'Lactation Counseling',
    description:
      'Personalized breastfeeding support and guidance to help you and your baby thrive from day one.',
    icon: <ChildFriendlyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: '3D Ultrasound Imaging',
    description:
      'Beautiful 3D imaging sessions so you can see and bond with your baby before birth.',
    icon: <CameraAltIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: 'Postpartum Support',
    description:
      'Emotional and practical support during the postpartum period, including resources for postpartum depression.',
    icon: <SpaIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
];

export default function Services({ detailed = false }: { detailed?: boolean }) {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: detailed ? 'background.default' : 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" textAlign="center" sx={{ mb: 1 }}>
          Our Services
        </Typography>
        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Holistic care for every stage of your maternal journey — from pregnancy through postpartum and beyond.
        </Typography>
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid key={service.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary">{service.description}</Typography>
                  {detailed && (
                    <Typography sx={{ mt: 2, fontSize: '0.9rem', color: 'text.secondary' }}>
                      Available in-home and via Zoom. Contact us for pricing and availability.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
