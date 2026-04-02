import type { Metadata } from 'next';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { colors, sectionSpace } from '@/theme/theme';

export const metadata: Metadata = {
  title: 'In-home rest visits',
  description:
    'Respite and in-home presence for parents who need a real break—vetted team members, flexible blocks, and clear boundaries alongside Anchored Arrival doula care.',
  keywords: [
    'in-home respite',
    'postpartum respite',
    'single parent support',
    "mother's helper",
    'in-home baby support',
    'Anchored Arrival',
  ],
};

const faqItems = [
  {
    q: 'How is this different from postpartum doula care?',
    a: 'Postpartum doula visits center on recovery, feeding strategy, emotional processing, and navigation. Rest visits prioritize practical presence—another capable adult in the home so you can nap, shower, run an errand, or simply not be the only person on duty.',
  },
  {
    q: 'Who provides the visits?',
    a: 'Our in-home rest team is vetted and aligned with Anchored Arrival standards. We match you with someone whose experience fits your household and your baby’s age.',
  },
  {
    q: 'How long can a visit be?',
    a: 'Blocks are flexible—often two to four hours, sometimes longer depending on need and availability. Tell us what would actually help; we’ll propose realistic options.',
  },
  {
    q: 'Do you offer full housekeeping or long-term nanny placement?',
    a: 'We are not a cleaning service or a nanny agency. Visits can include light, baby-adjacent tidying when it supports the parent’s rest—not whole-home deep cleans or exclusive long-term childcare contracts.',
  },
  {
    q: 'Where do we start?',
    a: 'Send an inquiry with your neighborhood, baby’s age, and the kind of window you’re hoping for (e.g. nap coverage, sibling help, solo-parent relief). We’ll follow up with next steps and availability.',
  },
];

export default function InHomeRestPage() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box
        component="section"
        aria-labelledby="in-home-rest-heading"
        sx={{ py: { xs: 8, md: sectionSpace.y }, scrollMarginTop: 88 }}
      >
        <Container maxWidth="md">
          <Link
            href="/services"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: colors.bronzeMuted,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
              marginBottom: 24,
            }}
          >
            ← All services
          </Link>

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
            In-home support
          </Typography>

          <Typography
            id="in-home-rest-heading"
            variant="h1"
            sx={{
              fontFamily: 'var(--font-display)',
              fontSize: { xs: '2.35rem', md: 'clamp(2.5rem, 4vw, 3.25rem)' },
              color: colors.espresso,
              fontWeight: 600,
              mb: 3,
              lineHeight: 1.1,
            }}
          >
            In-home rest visits
          </Typography>

          <Typography
            sx={{
              fontFamily: 'var(--font-sans)',
              fontSize: { xs: '1.05rem', md: '1.12rem' },
              color: colors.warmGray,
              lineHeight: 1.75,
              mb: 3,
            }}
          >
            Sometimes what you need is not another article or pep talk—it is another pair of hands
            in your actual home, while you close your eyes, take a shower, or step out for an hour
            without doing mental calculus about who is watching the baby.
          </Typography>

          <Typography
            sx={{
              fontFamily: 'var(--font-sans)',
              fontSize: { xs: '1.05rem', md: '1.12rem' },
              color: colors.warmGray,
              lineHeight: 1.75,
              mb: 3,
            }}
          >
            Our team offers scheduled in-home presence for parents who are solo, short on backup,
            between partners’ travel, or simply running on fumes. Think nap coverage,
            nanny-style continuity for a defined block of time, and calm company for little ones—not
            a rushed drop-in, and not a substitute for medical care.
          </Typography>

          <Typography
            sx={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontSize: { xs: '1.05rem', md: '1.1rem' },
              color: colors.warmGray,
              lineHeight: 1.72,
              mb: 5,
            }}
          >
            You are allowed to want rest without earning it first.
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontFamily: 'var(--font-display)',
              fontSize: { xs: '1.5rem', md: '1.65rem' },
              color: colors.espresso,
              fontWeight: 600,
              mb: 2,
            }}
          >
            Visits can include
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 5 }}>
            {[
              'Supervised awake time, feeds, and soothing so you can nap or be off-duty in another room',
              'Coverage while you run a short errand or attend an appointment',
              'Extra hands when siblings and a newborn need attention at the same time',
              'Light, baby-adjacent tidying (feeding station, bottle prep, folding baby laundry) when it supports your break',
            ].map((item) => (
              <Typography
                key={item}
                component="li"
                sx={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: colors.warmGray,
                  lineHeight: 1.75,
                  mb: 1.25,
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontFamily: 'var(--font-display)',
              fontSize: { xs: '1.5rem', md: '1.65rem' },
              color: colors.espresso,
              fontWeight: 600,
              mb: 2,
            }}
          >
            Who this is for
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: colors.warmGray,
              lineHeight: 1.75,
              mb: 5,
            }}
          >
            Single parents, solo weeks while a partner is away, families without relatives nearby,
            and anyone whose village is thin on the ground. If you have been white-knuckling
            through sleep debt and pretending you do not need backup, you are exactly who we had in
            mind.
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontFamily: 'var(--font-display)',
              fontSize: { xs: '1.5rem', md: '1.65rem' },
              color: colors.espresso,
              fontWeight: 600,
              mb: 2,
            }}
          >
            How it works
          </Typography>
          <Box component="ol" sx={{ m: 0, pl: 2.5, mb: 5 }}>
            {[
              'You reach out with your location, baby’s age, and what kind of window would help.',
              'We confirm fit, explain investment, and match you with a team member.',
              'We schedule your block(s). You get predictable relief—not a vague “let us know.”',
            ].map((item) => (
              <Typography
                key={item}
                component="li"
                sx={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: colors.warmGray,
                  lineHeight: 1.75,
                  mb: 1.25,
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          <Typography
            sx={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              color: colors.warmGray,
              lineHeight: 1.75,
              mb: 6,
              pb: 5,
              borderBottom: `1px solid rgba(58,53,48,0.1)`,
            }}
          >
            Every rest visit is held to the same care standards as the rest of Anchored Arrival. We
            vet experience, judgment, and alignment with how families deserve to be treated.
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontFamily: 'var(--font-display)',
              fontSize: { xs: '1.5rem', md: '1.65rem' },
              color: colors.espresso,
              fontWeight: 600,
              mb: 3,
            }}
          >
            Questions
          </Typography>
          <Stack spacing={3} sx={{ mb: 6 }}>
            {faqItems.map((item) => (
              <Box key={item.q}>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: colors.espresso,
                    mb: 1,
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.q}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: colors.warmGray,
                    lineHeight: 1.75,
                  }}
                >
                  {item.a}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large" component="span">
              Request in-home rest
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
