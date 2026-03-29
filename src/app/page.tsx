import Hero from '@/components/Hero';
import RallyStrip from '@/components/RallyStrip';
import SocialLinks from '@/components/SocialLinks';
import CreatorNetworkCTA from '@/components/CreatorNetworkCTA';
import GalleryTeaser from '@/components/GalleryTeaser';
import MusicTeaser from '@/components/MusicTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <RallyStrip />
      <SocialLinks />
      <CreatorNetworkCTA />
      <GalleryTeaser />
      <MusicTeaser />
    </>
  );
}
