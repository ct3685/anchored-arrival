import { Metadata } from 'next';
import PhotoGallery from '@/components/PhotoGallery';

export const metadata: Metadata = {
  title: 'Gallery | Agent Morgie 00BA',
  description: 'View the many vibes of Agent Morgie 00BA - Main Character Energy, Matrix Mode, DJ vibes and more!',
};

export default function GalleryPage() {
  return <PhotoGallery />;
}
