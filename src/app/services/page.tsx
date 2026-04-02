import type { Metadata } from 'next';
import Services from '@/components/Services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Doula support, birth education, lactation help, 3D ultrasound, postpartum care, and in-home rest visits.',
};

export default function ServicesPage() {
  return <Services detailed />;
}
