import type { Metadata } from 'next';
import Services from '@/components/Services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Doula support, birth education, lactation counseling, 3D ultrasounds, postpartum care, and in-home rest visits.',
};

export default function ServicesPage() {
  return <Services detailed />;
}
