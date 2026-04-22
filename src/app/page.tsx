import { getSiteContent } from "@/lib/cms/get-site-content";
import HeroSection from "@/components/sections/HeroSection";
import TrustBarSection from "@/components/sections/TrustBarSection";
import ServicesGridSection from "@/components/sections/ServicesGridSection";
import ProofSection from "@/components/sections/ProofSection";
import ProcessSection from "@/components/sections/ProcessSection";
import DifferentiatorsSection from "@/components/sections/DifferentiatorsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-[#030712] text-slate-50 selection:bg-cyan-500/30">
      <HeroSection content={content} />
      <TrustBarSection content={content} />
      <ServicesGridSection content={content} />
      <ProofSection content={content} />
      <ProcessSection content={content} />
      <DifferentiatorsSection content={content} />
      <TestimonialsSection content={content} />
      <FAQSection content={content} />
      <FinalCTASection content={content} />
    </main>
  );
}
