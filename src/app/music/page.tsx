import { Metadata } from 'next';
import TrackList from '@/components/TrackList';

export const metadata: Metadata = {
  title: 'Music | Agent Morgie 00BA',
  description: 'Listen to music from Agent Morgie 00BA - Live... And Lethal!',
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
            '@id': 'https://agentmorgie.com/music#live-and-lethal',
            name: "LIVE… AND LETHAL (Morgie's On a Mission!)",
            url: 'https://agentmorgie.com/music',
            byArtist: {
              '@type': 'Person',
              '@id': 'https://agentmorgie.com/#person',
              name: 'Agent Morgie',
            },
            inAlbum: {
              '@type': 'MusicAlbum',
              name: 'Live... And Lethal',
            },
          }),
        }}
      />
      <TrackList />
    </>
  );
}
