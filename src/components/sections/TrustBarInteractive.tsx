"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { TrustMetric } from "@/content/site-content";
import MetricCounter from "@/components/site/MetricCounter";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";
import { Reveal, Stagger, Item } from "@/components/site/MotionPrimitives";

function MetricCard({ metric, index }: { metric: TrustMetric; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -55 - index * 6]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-2.2 + index * 0.7, 1.8 - index * 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.96, 1.03, 0.985]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["blur(4px)", "blur(0px)", "blur(2px)"],
  );

  const ySpring = useSpring(y, { stiffness: 110, damping: 22, mass: 0.25 });

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y: ySpring, rotateZ, scale, filter }}
    >
      <TiltSpotlightCard className="px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-2xl font-semibold text-white md:text-3xl">
            <MetricCounter value={metric.value} />
          </p>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.22em] text-white/70 uppercase">
            Verified
          </span>
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-300">{metric.label}</p>
        <div className="mt-4 h-px w-full bg-gradient-to-r from-cyan-300/40 via-white/10 to-transparent" />
        <p className="mt-3 text-sm text-slate-200/90">
          Built with budgets, guardrails, and milestones — so it ships fast and stays fast.
        </p>
      </TiltSpotlightCard>
    </motion.div>
  );
}

export default function TrustBarInteractive({
  metrics,
  logos,
}: {
  metrics: TrustMetric[];
  logos: { name: string }[];
}) {
  const reduce = useReducedMotion();

  return (
    <>
      <Reveal>
        <Stagger>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {metrics.map((metric, index) => (
              <Item key={metric.label}>
                <MetricCard metric={metric} index={index} />
              </Item>
            ))}
          </div>
        </Stagger>
      </Reveal>

      <div className="mt-10">
        <Reveal delay={0.05}>
          <p className="text-xs uppercase tracking-[0.28em] text-white/70">Industries</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-4 marquee rounded-3xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
            <motion.div
              className="marquee-track flex w-max items-center gap-3"
              style={
                reduce
                  ? undefined
                  : {
                      ["--marquee-duration" as never]: "18s",
                    }
              }
            >
              {logos.slice(0, 10).map((logo) => (
                <span
                  key={logo.name}
                  className="group relative rounded-full border border-white/10 bg-slate-950/35 px-5 py-2 text-xs tracking-[0.22em] text-white/80 uppercase transition hover:border-white/20 hover:bg-white/10"
                >
                  <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(120px_circle_at_50%_50%,rgba(34,211,238,0.25),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {logo.name}
                </span>
              ))}

              {logos.slice(0, 10).map((logo) => (
                <span
                  key={`${logo.name}-dup`}
                  aria-hidden="true"
                  className="group relative rounded-full border border-white/10 bg-slate-950/35 px-5 py-2 text-xs tracking-[0.22em] text-white/80 uppercase transition hover:border-white/20 hover:bg-white/10"
                >
                  <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(120px_circle_at_50%_50%,rgba(34,211,238,0.25),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {logo.name}
                </span>
              ))}
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-4 text-sm text-slate-300">Trusted by teams shipping worldwide.</p>
        </Reveal>
      </div>
    </>
  );
}

