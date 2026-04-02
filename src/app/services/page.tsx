import type { Metadata } from 'next';
import Services from '@/components/Services';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Doula support, birth education, lactation counseling, 3D ultrasounds, and postpartum care.',
};

export default function ServicesPage() {
  return <Services detailed />;
}
