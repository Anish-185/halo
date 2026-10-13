import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { Statement } from "@/components/sections/statement";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LiveDemo } from "@/components/sections/live-demo";
import { Features } from "@/components/sections/features";
import { Playground } from "@/components/sections/playground";
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
        <Ticker />
        <Statement />
        <HowItWorks />
        <LiveDemo />
        <Features />
        <Playground />
        <UseCases />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
    </>
  );
}
