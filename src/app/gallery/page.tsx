import { Metadata } from 'next';
import PhotoGallery from '@/components/PhotoGallery';

export const metadata: Metadata = {
  title: 'Gallery | Trevor - Ranch Squad',
  description:
    'View the many vibes of Trevor and the Ranch Squad — country energy, dramatic entrances, and more!',
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
            name: 'Ranch Squad Gallery',
            description:
              'View the many vibes of Trevor and the Ranch Squad.',
            author: {
              '@type': 'Person',
              name: 'Trevor',
            },
          }),
        }}
      />
      <PhotoGallery />
    </>
  );
}
