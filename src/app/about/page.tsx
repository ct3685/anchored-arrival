import type { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Alissa Thorson and Anchored Arrival: grounded birth and postpartum support with room for your story.',
};

export default function AboutPage() {
  return <About full />;
}
