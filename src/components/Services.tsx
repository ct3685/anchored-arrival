'use client';

import { Box, Typography, Container, Grid, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { colors, sectionSpace } from '@/theme/theme';
import SectionDivider from './SectionDivider';

type ServiceItem = {
  title: string;
  description: string;
  accent: string;
  image: string;
  imageAlt: string;
  href?: string;
  learnMoreLabel?: string;
};

const services: ServiceItem[] = [
  {
    title: 'Doula support',
    description:
      'Attuned physical and emotional care through pregnancy, labor, and the first hours after birth—so you are never scanning the room for an anchor.',
    accent: colors.clay,
    image: '/images/birth-support-doula.png',
    imageAlt: 'Doula offering steady, compassionate support during labor.',
  },
  {
    title: 'Birth education',
    description:
      'Private and small-group immersions in physiology, coping, and decision-making—designed for adults who want substance, not scare tactics.',
    accent: colors.gold,
    image: '/images/maternity-portrait-seated.png',
    imageAlt: 'Pregnant person at rest in a serene room, hands resting on their belly.',
  },
  {
    title: 'Lactation counseling',
    description:
      'Practical, judgment-free feeding support: latch, supply, pumping plans, and the emotional weight that rides alongside.',
    accent: colors.clay,
    image: '/images/maternity-portrait-standing.png',
    imageAlt: 'Pregnant person in soft light, a quiet moment of embodiment and care.',
  },
  {
    title: '3D ultrasound imaging',
    description:
      'Intimate imaging sessions to meet your baby in detail—held with reverence, never rush.',
    accent: colors.gold,
    image: '/images/anchor-still-life.png',
    imageAlt: 'Artful anchor and soft light, evoking meeting your baby with intention.',
  },
  {
    title: 'Postpartum care',
    description:
      'Recovery check-ins, mood monitoring, and resource navigation when the world goes quiet and the work gets real.',
    accent: colors.clay,
    image: '/images/postpartum-mother-newborn.png',
    imageAlt: 'Parent holding a newborn close in a warm, peaceful home setting.',
  },
  {
    title: 'In-home rest visits',
    description:
      'Vetted team presence so you can nap, shower, or step out—nap coverage and hands-on help when you are the default adult on duty.',
    accent: colors.gold,
    image: '/images/abstract-earth-layers.png',
    imageAlt: 'Soft layered textures in warm earth tones suggesting rest and grounding.',
    href: '/services/in-home-rest',
    learnMoreLabel: 'Learn more',
  },
];

function EditorialServices() {
  return (
    <Box
      component="section"
      id="offerings"
      aria-labelledby="offerings-heading"
      sx={{
        py: sectionSpace.y,
        bgcolor: 'background.default',
        scrollMarginTop: 88,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'flex-end' },
            justifyContent: 'space-between',
            gap: 3,
            mb: { xs: 2, md: 1 },
          }}
        >
          <Box sx={{ maxWidth: 640 }}>
            <Typography
              sx={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: colors.bronzeMuted,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Offerings
            </Typography>
            <Typography
              id="offerings-heading"
              variant="h2"
              sx={{
                fontSize: { xs: '2.1rem', md: 'clamp(2.35rem, 3.8vw, 3.4rem)' },
                color: colors.espresso,
                fontWeight: 600,
                mb: 2,
              }}
            >
              Care that scales with the moment.
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-sans)',
                fontSize: { xs: '1.02rem', md: '1.08rem' },
                color: colors.warmGray,
                lineHeight: 1.7,
              }}
            >
              Every package is tailored. You do not need a polished plan to reach out—only an
              honest next step.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            href="/services"
            sx={{ alignSelf: { xs: 'flex-start', md: 'flex-end' }, flexShrink: 0 }}
          >
            Every offering, in detail
          </Button>
        </Box>

        <SectionDivider ornament />

        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {services.map((service, index) => (
            <Box
              component="li"
              key={service.title}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: index % 2 === 0 ? '1fr 1.15fr' : '1.15fr 1fr' },
                gap: { xs: 2, md: 6 },
                alignItems: 'center',
                py: { xs: 4, md: 5 },
                borderBottom: `1px solid rgba(58,53,48,0.08)`,
              }}
            >
              <Box
                sx={{
                  order: { xs: 0, md: index % 2 === 0 ? 0 : 1 },
                  height: { xs: 4, md: 220 },
                  minHeight: { xs: 4, md: 160 },
                  bgcolor: { xs: 'transparent', md: colors.sand },
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: { xs: `3px solid ${service.accent}`, md: 'none' },
                }}
              >
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    inset: 0,
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 900px) 0vw, 45vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </Box>
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(145deg, ${service.accent}28 0%, transparent 50%)`,
                    pointerEvents: 'none',
                  }}
                />
              </Box>
              <Box sx={{ order: { xs: 1, md: index % 2 === 0 ? 1 : 0 } }}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-display)',
                    fontSize: { xs: '1.65rem', md: '1.85rem' },
                    color: colors.espresso,
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.98rem',
                    color: colors.warmGray,
                    lineHeight: 1.75,
                    maxWidth: 480,
                  }}
                >
                  {service.description}
                </Typography>
                {service.href ? (
                  <Button
                    variant="text"
                    color="primary"
                    component={Link}
                    href={service.href}
                    sx={{
                      mt: 2,
                      p: 0,
                      minWidth: 0,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {service.learnMoreLabel ?? 'Learn more'}
                  </Button>
                ) : null}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default function Services({
  detailed = false,
  variant = 'default',
}: {
  detailed?: boolean;
  variant?: 'default' | 'editorial';
}) {
  if (variant === 'editorial') {
    return <EditorialServices />;
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: detailed ? 'background.default' : 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '2rem', md: '2.8rem' }, color: colors.espresso }}
        >
          Services
        </Typography>

        <SectionDivider />

        <Typography
          textAlign="center"
          sx={{
            fontFamily: 'var(--font-accent)',
            fontStyle: 'italic',
            fontSize: { xs: '1.05rem', md: '1.2rem' },
            color: 'text.secondary',
            mb: { xs: 6, md: 8 },
            maxWidth: 560,
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          Holistic care from pregnancy through postpartum—with room for your story in every step.
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service) => (
            <Grid key={service.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  p: { xs: 3.5, md: 4 },
                  height: '100%',
                  borderTop: `3px solid ${service.accent}`,
                  boxShadow: '0 1px 8px rgba(44,38,34,0.05)',
                  border: '1px solid rgba(58,53,48,0.06)',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 20px 40px rgba(30,26,23,0.07)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontSize: { xs: '1.15rem', md: '1.25rem' },
                    fontWeight: 600,
                    color: colors.espresso,
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.75,
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {service.description}
                </Typography>
                {service.href ? (
                  <Button
                    variant="text"
                    color="primary"
                    component={Link}
                    href={service.href}
                    sx={{
                      mt: 2,
                      p: 0,
                      minWidth: 0,
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {service.learnMoreLabel ?? 'Learn more'}
                  </Button>
                ) : null}
                {detailed && (
                  <Typography
                    sx={{
                      mt: 2.5,
                      pt: 2.5,
                      borderTop: `1px solid rgba(184,152,106,0.2)`,
                      fontSize: '0.85rem',
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      fontFamily: 'var(--font-accent)',
                    }}
                  >
                    In-home and virtual appointments. Contact for availability and investment.
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
