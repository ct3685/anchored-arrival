import type { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Anchored Arrival and Alissa Thorson\'s mission to support families with confident, grounded birth care.',
};

export default function AboutPage() {
  return <About full />;
}
