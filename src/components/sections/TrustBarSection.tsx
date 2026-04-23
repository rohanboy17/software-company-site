"use client";

import React from "react";
import type { SiteContent } from "@/content/site-content";
import { SectionHeader, SectionShell } from "@/components/site/SectionPrimitives";
import { Reveal } from "@/components/site/MotionPrimitives";
import TrustBarInteractive from "@/components/site/TrustBarInteractive";
import TrustSceneWrapper from "@/components/3d/TrustSceneWrapper";

type TrustMetricWithDetail = { label: string; value: string; detail?: string };

const defaultMetrics: TrustMetricWithDetail[] = [
  { label: "Avg. Lighthouse", value: "95+", detail: "Every build is audited against strict Core Web Vitals budgets to ensure maximum performance." },
  { label: "Time-to-ship", value: "2–6 wks", detail: "Our engineering velocity allows us to move from discovery to production-ready code in record time." },
  { label: "Performance budget", value: "Strict", detail: "Zero-compromise on bundle sizes, hydration times, and image optimization metrics." },
  { label: "Delivery model", value: "Milestones", detail: "Bi-weekly syncs and tight feedback loops ensure the product evolves exactly as envisioned." },
];

export default function TrustBarSection({ content }: { content: SiteContent }) {
  const metrics: TrustMetricWithDetail[] = content.trust?.metrics?.length
    ? content.trust.metrics.map((m) => ({ label: m.label, value: m.value }))
    : defaultMetrics;
  const logos = content.trust?.logos?.length
    ? content.trust.logos
    : [{ name: "FinTech" }, { name: "HealthTech" }, { name: "SaaS" }, { name: "Logistics" }];

  return (
    <SectionShell 
      id="proof" 
      className="relative overflow-hidden bg-[#030712] py-28"
      background={<TrustSceneWrapper />}
    >
      <div className="relative z-10">
        <SectionHeader
          eyebrow="Proof"
          title={
            <span className="text-white">
              Performance-first delivery, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                measured not promised.
              </span>
            </span>
          }
          description="Trusted by teams shipping worldwide — optimized for Core Web Vitals, reliability, and clean handoffs."
        />

        {/* 3D Tilt Metric Cards */}
        <TrustBarInteractive metrics={metrics} />

        {/* Premium Star Marquee */}
        <div className="mt-24">
          <Reveal delay={0.2}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500">Industries we power</p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="marquee group overflow-hidden">
              <div className="marquee-track flex w-max items-center gap-12 py-6">
                {[...logos, ...logos, ...logos].map((logo, i) => (
                  <React.Fragment key={`${logo.name}-${i}`}>
                    <span className="flex items-center gap-12">
                      <span className="text-sm font-bold tracking-[0.3em] text-white/40 uppercase hover:text-white transition-colors cursor-default">
                        {logo.name}
                      </span>
                      <span className="text-cyan-500/40 text-lg">✦</span>
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.4}>
            <p className="mt-12 text-center text-sm font-medium text-slate-500">
              Trusted by teams shipping worldwide.
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}


