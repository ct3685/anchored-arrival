import { Metadata } from 'next';
import TrackList from '@/components/TrackList';

export const metadata: Metadata = {
  title: 'Music | Agent Morgie 00BA',
  description: 'Listen to music from Agent Morgie 00BA - Live... And Lethal!',
};

export default function MusicPage() {
  return <TrackList />;
}
