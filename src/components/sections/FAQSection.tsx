import Link from "next/link";
import type { FAQItem, SiteContent } from "@/content/site-content";
import { SectionHeader, SectionShell, Chip } from "@/components/site/SectionPrimitives";
import FAQAccordion from "@/components/site/FAQAccordion";

const fallbackFaqs: FAQItem[] = [
  {
    q: "How do you price projects?",
    a: "Fixed-scope for well-defined builds, or monthly retainers for iterative product work. We'll recommend the model that reduces risk.",
  },
  {
    q: "How fast can we launch?",
    a: "Most marketing sites ship in 2–6 weeks depending on complexity. We'll define milestones and a delivery plan in the first call.",
  },
  {
    q: "Who owns the code and design?",
    a: "You do. All deliverables and source code are yours after final payment, under the terms of the engagement agreement.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Yes — we can integrate with your engineers/designers, or deliver end-to-end with clear handoff documentation.",
  },
];

export default function FAQSection({ content }: { content?: SiteContent }) {
  const faqs = content?.faqs?.length ? content.faqs : fallbackFaqs;

  return (
    <SectionShell id="faq" variant="alt">
      <SectionHeader
        eyebrow="FAQ"
        title="Quick answers."
        description="No surprises: scope, timelines, ownership, and delivery models — clearly defined."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <FAQAccordion items={faqs} />

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Still unsure?</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">
            Get a clear plan in 30 minutes.
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            We&apos;ll audit your current stack, align on goals, and outline a delivery path with milestones.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip>Launch Sprint</Chip>
            <Chip>Retainer</Chip>
            <Chip>Embedded</Chip>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Request a quote
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore services
            </Link>
          </div>
        </aside>
      </div>
    </SectionShell>
  );
}
