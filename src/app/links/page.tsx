import { Metadata } from 'next';
import LinkTree from '@/components/LinkTree';

export const metadata: Metadata = {
  title: 'Links',
  description:
    'Connect with Trevor and the Ranch Squad — TikTok, music, and more!',
  alternates: {
    canonical: '/links',
  },
  openGraph: {
    title: 'Links | Ranch Squad',
    description:
      'Connect with Trevor and the Ranch Squad — TikTok, music, and more!',
    url: '/links',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Links | Ranch Squad',
    description:
      'Connect with Trevor and the Ranch Squad — TikTok, music, and more!',
  },
};

export default function LinksPage() {
  return <LinkTree />;
}
