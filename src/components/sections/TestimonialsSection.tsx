import type { SiteContent, Testimonial } from "@/content/site-content";
import { SectionHeader, SectionShell } from "@/components/site/SectionPrimitives";
import TestimonialsCarousel from "@/components/site/TestimonialsCarousel";

const fallbackTestimonials: Testimonial[] = [
  {
    quote:
      "NovaAxis shipped a performance-first website that doubled qualified leads without sacrificing the cinematic feel.",
    name: "VP Growth",
    role: "VP Growth",
    company: "B2B SaaS",
  },
  {
    quote:
      "The team moved fast, communicated clearly, and delivered an interface that feels genuinely premium on every device.",
    name: "Product Lead",
    role: "Product Lead",
    company: "HealthTech",
  },
  {
    quote:
      "Best vendor experience we've had — clean engineering, great motion craft, and everything launched on time.",
    name: "Founder",
    role: "Founder",
    company: "FinTech",
  },
];

export default function TestimonialsSection({ content }: { content?: SiteContent }) {
  const testimonials =
    content?.testimonials?.length ? content.testimonials : fallbackTestimonials;

  return (
    <SectionShell id="testimonials">
      <SectionHeader
        eyebrow="Testimonials"
        title="Trusted when the launch matters."
        description="We optimize for outcomes and reliability — so your team can ship confidently."
      />
      <div className="mt-12">
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </SectionShell>
  );
}

