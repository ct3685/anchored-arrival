import { Metadata } from 'next';
import PhotoGallery from '@/components/PhotoGallery';

export const metadata: Metadata = {
  title: 'Gallery | Agent Morgie 00BA',
  description:
    'View the many vibes of Agent Morgie 00BA - Main Character Energy, Matrix Mode, DJ vibes and more!',
  alternates: {
    canonical: '/gallery',
  },
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            '@id': 'https://agentmorgie.com/gallery#gallery',
            name: 'Agent Morgie Gallery',
            description:
              'View the many vibes of Agent Morgie 00BA - Main Character Energy, Matrix Mode, DJ vibes and more!',
            url: 'https://agentmorgie.com/gallery',
            author: {
              '@type': 'Person',
              '@id': 'https://agentmorgie.com/#person',
              name: 'Agent Morgie',
            },
          }),
        }}
      />
      <PhotoGallery />
    </>
  );
}
