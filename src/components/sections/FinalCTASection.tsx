"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SiteContent } from "@/content/site-content";
import { Chip } from "@/components/site/SectionPrimitives";
import { Reveal } from "@/components/site/MotionPrimitives";

export default function FinalCTASection({ content }: { content: SiteContent }) {
  const schedulingUrl = content.company?.schedulingUrl;
  const email = content.company?.email ?? "rohanmondalpc@gmail.com";
  type CTAStyle = React.CSSProperties & { ["--mouse-x"]?: string; ["--mouse-y"]?: string };
  const glowStyle: CTAStyle = { "--mouse-x": "20%", "--mouse-y": "30%" };

  return (
    <section className="relative bg-[#030712] pb-32 pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)] blur-3xl" />
      
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="relative rounded-[48px] border border-white/10 bg-slate-900/40 p-12 backdrop-blur-3xl overflow-hidden group">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(34,211,238,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                 style={glowStyle} />
            
            <div className="relative z-10 grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-400">Final Step</p>
                  <h2 className="mt-6 text-4xl font-bold text-white md:text-6xl tracking-tight leading-[1.1]">
                    Ready to build something that feels years ahead?
                  </h2>
                  <p className="mt-8 max-w-2xl text-xl text-slate-400 leading-relaxed">
                    Share your scope and we&apos;ll reply within 1 business day with next steps, a timeline,
                    and a proposal path.
                  </p>
                </motion.div>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Chip>Launch Sprint (2–6 weeks)</Chip>
                  <Chip>Retainer</Chip>
                  <Chip>Embedded</Chip>
                </div>

                <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-10 py-5 text-base font-bold text-slate-950 transition-all hover:bg-cyan-300 hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)]"
                  >
                    Request a quote
                  </Link>
                  {schedulingUrl ? (
                    <a
                      href={schedulingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 py-5 text-base font-bold text-white transition-all hover:bg-white/10 hover:border-white/40"
                    >
                      Book a strategy call
                    </a>
                  ) : (
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 py-5 text-base font-bold text-white transition-all hover:bg-white/10 hover:border-white/40"
                    >
                      Email us
                    </a>
                  )}
                </div>
                
                <p className="mt-8 text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">
                  Response time: 1 business day
                </p>
              </div>

              <motion.aside 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-[40px] border border-white/10 bg-slate-950/50 p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group/aside"
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover/aside:bg-cyan-500/20 transition-colors" />
                
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">What you get</p>
                <ul className="mt-8 space-y-6">
                  {[
                    "Milestone plan + delivery timeline",
                    "Performance budget for Core Web Vitals",
                    "Design + motion system direction",
                    "Clear scope and next steps",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4 group/item">
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-500 group-hover/item:scale-150 transition-transform" />
                      <span className="text-base text-slate-200 group-hover/item:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-10 rounded-3xl border border-white/5 bg-white/5 p-6 transition-colors hover:bg-white/10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Our Guarantee</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    If we&apos;re not a fit, we&apos;ll tell you fast — and point you to the best next option.
                  </p>
                </div>
                
                <Link
                  href="/services"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-900 px-7 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:border-white/20"
                >
                  See pricing model
                </Link>
              </motion.aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
