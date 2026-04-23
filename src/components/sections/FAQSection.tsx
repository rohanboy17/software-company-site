"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FAQItem, SiteContent } from "@/content/site-content";
import { SectionHeader, SectionShell, Chip } from "@/components/site/SectionPrimitives";
import { Reveal } from "@/components/site/MotionPrimitives";
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
    <SectionShell id="faq" variant="alt" className="py-32">
      <SectionHeader
        eyebrow="FAQ"
        title="Quick answers."
        description="No surprises: scope, timelines, ownership, and delivery models — clearly defined."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="rounded-[40px] border border-white/5 bg-slate-950/30 p-2 backdrop-blur-xl">
            <FAQAccordion items={faqs} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.aside 
            whileHover={{ y: -5 }}
            className="rounded-[40px] border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-10 backdrop-blur-3xl md:p-12 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">Still unsure?</p>
            <h3 className="mt-6 text-3xl font-bold text-white tracking-tight">
              Get a clear plan in 30 minutes.
            </h3>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              We&apos;ll audit your current stack, align on goals, and outline a delivery path with milestones.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-2">
              <Chip>Launch Sprint</Chip>
              <Chip>Retainer</Chip>
              <Chip>Embedded</Chip>
            </div>
            
            <div className="mt-10 flex flex-col gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-50 hover:scale-[1.02] shadow-xl"
              >
                Request a quote
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/20"
              >
                Explore services
              </Link>
            </div>
            
            <div className="mt-10 pt-10 border-t border-white/5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                Trusted by 50+ Global teams
              </p>
            </div>
          </motion.aside>
        </Reveal>
      </div>
    </SectionShell>
  );
}

