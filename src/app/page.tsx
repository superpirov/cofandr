import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Problems } from "@/components/sections/Problems";
import { Benefits } from "@/components/sections/Benefits";
import { About } from "@/components/sections/About";
import { Program } from "@/components/sections/Program";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ViewTracker } from "@/components/analytics/ViewTracker";

export default function HomePage() {
  return (
    <>
      <ViewTracker sectionId="program" event="program_view" />
      <Hero />
      <SocialProof />
      <Problems />
      <Benefits />
      <About />
      <Program />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
