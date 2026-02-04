import { Metadata } from 'next';
import LinkTree from '@/components/LinkTree';

export const metadata: Metadata = {
  title: 'Links | Agent Morgie',
  description: 'Connect with Agent Morgie - TikTok, music, and more!',
  alternates: {
    canonical: '/links',
  },
};

export default function LinksPage() {
  return <LinkTree />;
}
