import { Metadata } from 'next';
import TrackList from '@/components/TrackList';

export const metadata: Metadata = {
  title: 'Music | Trevor - Ranch Squad',
  description: "Listen to music from Trevor — Com'On, it's gooder than shit!",
  alternates: {
    canonical: '/music',
  },
};

export default function MusicPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicRecording',
            name: 'Ranch Squad Anthem',
            byArtist: {
              '@type': 'Person',
              name: 'Trevor',
            },
          }),
        }}
      />
      <TrackList />
    </>
  );
}
