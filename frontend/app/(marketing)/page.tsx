import { CtaSection } from "@/app/components/cta-section";
import { Features } from "@/app/components/features";
import { Hero } from "@/app/components/hero";
import { HowItWorks } from "@/app/components/how-it-works";
import { UseCases } from "@/app/components/use-cases";

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <CtaSection />
    </>
  );
}
