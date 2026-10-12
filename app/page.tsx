import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LiveDemo } from "@/components/sections/live-demo";
import { Features } from "@/components/sections/features";
import { UseCases } from "@/components/sections/use-cases";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <LiveDemo />
        <Features />
        <UseCases />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
    </>
  );
}
