"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useMemo, useRef } from "react";
import type { ProcessStep } from "@/content/site-content";

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.2 });
  const safeSteps = useMemo(() => steps.slice(0, 6), [steps]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-5 top-0 h-full w-px bg-white/10 md:left-1/2" />
      {!reduce ? (
        <motion.div
          className="absolute left-5 top-0 w-px bg-gradient-to-b from-cyan-300 via-blue-400 to-transparent md:left-1/2"
          style={{ height: "100%", scaleY: progress, transformOrigin: "top" }}
        />
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        {safeSteps.map((step, index) => {
          const side = index % 2 === 0 ? "md:pr-10 md:text-right md:justify-self-end" : "md:pl-10";
          const dotSide = index % 2 === 0 ? "md:left-1/2 md:-translate-x-1/2" : "md:left-1/2 md:-translate-x-1/2";
          return (
            <div key={step.title} className={`relative ${side}`}>
              <div className={`absolute left-4 top-8 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_0_6px_rgba(34,211,238,0.15)] md:top-10 ${dotSide}`} />
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-white/70">Step {index + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-200">{step.detail}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

