import { Metadata } from 'next';
import LinkTree from '@/components/LinkTree';

export const metadata: Metadata = {
  title: 'Links | Trevor - Ranch Squad',
  description: "Connect with Trevor and the Ranch Squad — TikTok, music, and more!",
  alternates: {
    canonical: '/links',
  },
};

export default function LinksPage() {
  return <LinkTree />;
}
