import { Metadata } from 'next';
import TrackList from '@/components/TrackList';
import { tracks } from '@/lib/tracks';

export const metadata: Metadata = {
  title: 'Music',
  description: "Listen to music from Trevor — Com'On, it's gooder than shit!",
  alternates: {
    canonical: '/music',
  },
  openGraph: {
    title: 'Music | Ranch Squad',
    description: "Listen to music from Trevor — Com'On, it's gooder than shit!",
    url: '/music',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music | Ranch Squad',
    description: "Listen to music from Trevor — Com'On, it's gooder than shit!",
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
            '@type': 'MusicPlaylist',
            name: 'Ranch Squad Music',
            description:
              "Original tracks from Trevor and the Ranch Squad community.",
            url: 'https://ranchsquad.com/music',
            numTracks: tracks.length,
            track: tracks.map((t) => ({
              '@type': 'MusicRecording',
              name: t.title,
              byArtist: {
                '@type': 'MusicGroup',
                name: t.artist,
              },
            })),
          }),
        }}
      />
      <TrackList />
    </>
  );
}
