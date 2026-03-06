import Hero from '@/components/Hero';
import HawaiiGiveawaySection from '@/components/HawaiiGiveawaySection';
import CreatorNetworkCTA from '@/components/CreatorNetworkCTA';
import { HawaiiGiveawayPopupLazy } from '@/components/ClientShell';

export default function Home() {
  return (
    <>
      <Hero />
      <HawaiiGiveawayPopupLazy />
      <HawaiiGiveawaySection />
      <CreatorNetworkCTA />
    </>
  );
}
