import type { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Tender Beginnings Wellness and our mission to support families.',
};

export default function AboutPage() {
  return <About full />;
}
