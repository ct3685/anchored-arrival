import { Metadata } from 'next';
import PhotoGallery from '@/components/PhotoGallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'View the many vibes of Trevor and the Ranch Squad — country energy, dramatic entrances, and more!',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Gallery | Ranch Squad',
    description:
      'View the many vibes of Trevor and the Ranch Squad — country energy, dramatic entrances, and more!',
    url: '/gallery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Ranch Squad',
    description:
      'View the many vibes of Trevor and the Ranch Squad — country energy, dramatic entrances, and more!',
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
            url: 'https://ranchsquad.com/gallery',
            description: 'View the many vibes of Trevor and the Ranch Squad.',
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
