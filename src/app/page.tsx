import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import PhilosophySection from '@/components/PhilosophySection';
import Services from '@/components/Services';
import Differentiators from '@/components/Differentiators';
import ProcessSection from '@/components/ProcessSection';
import Testimonials from '@/components/Testimonials';
import ClosingCta from '@/components/ClosingCta';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <PhilosophySection />
      <Services variant="editorial" />
      <Differentiators />
      <ProcessSection />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
