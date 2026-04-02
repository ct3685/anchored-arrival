import type { Metadata } from 'next';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { colors, sectionSpace } from '@/theme/theme';

export const metadata: Metadata = {
  title: 'In-home rest visits',
  description:
    'In-home rest for parents who need a real break: vetted team, flexible blocks, clear scope. Works alongside Anchored Arrival doula care.',
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
    a: 'Postpartum doula visits focus on recovery, feeding, feelings, and figuring out what comes next. Rest visits are simpler: another capable adult in the house so you can nap, shower, run a quick errand, or stop being the only person on duty.',
  },
  {
    q: 'Who provides the visits?',
    a: 'The rest team is vetted to the same standards as the rest of the practice. We match you with someone whose experience fits your household and how old your baby is.',
  },
  {
    q: 'How long can a visit be?',
    a: 'Blocks are flexible. Often two to four hours; sometimes longer if need and schedule allow. Say what would actually help and we will suggest what is realistic.',
  },
  {
    q: 'Do you offer full housekeeping or long-term nanny placement?',
    a: 'We are not a cleaning company or a nanny agency. Light tidying near the baby zone is fine when it helps you rest. We do not do whole-home deep cleans or long-term sole-care contracts.',
  },
  {
    q: 'Where do we start?',
    a: 'Send a note with your neighborhood, baby’s age, and the window you need (nap coverage, sibling help, solo-parent stretch). We reply with next steps and what we have open.',
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
            Sometimes you do not need another article or pep talk. You need another pair of hands in
            your own home while you shut your eyes, shower, or step out for an hour without running
            the math on who has the baby.
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
            Scheduled in-home help for parents who are solo, short on backup, covering a partner’s
            trip, or running on fumes. Nap coverage, the same person for a set block, calm company
            for little kids. Not a rushed drop-in. Not medical care.
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
            Rest is not something you have to earn first.
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
            Single parents, weeks alone while a partner travels, families without relatives close by,
            anyone whose village is thin. If you have been white-knuckling through sleep debt and
            telling yourself you should not need help, you are who we built this for.
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
              'You write with your location, baby’s age, and the kind of window that would help.',
              'We confirm fit, explain cost, and match you with someone on the team.',
              'We put your block(s) on the calendar. Relief with a date on it, not a vague “circle back.”',
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
            Rest visits meet the same bar as the rest of Anchored Arrival: experience, judgment,
            and how we believe families should be treated.
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
