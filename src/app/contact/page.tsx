import { Metadata } from 'next';
import ContactPageContent from '@/components/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Trevor | Ranch Squad',
  description:
    "Get in touch with Trevor and the Ranch Squad. Com'On, reach out!",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
