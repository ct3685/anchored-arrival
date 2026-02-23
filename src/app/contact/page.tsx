import { Metadata } from 'next';
import ContactPageContent from '@/components/ContactPageContent';

export const metadata: Metadata = {
  title: 'Operation: Contact Morgie | Agent Morgie',
  description:
    "Complete the spy mission to unlock Agent Morgie's classified contact dossier. Interactive puzzles and secure channels await.",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
