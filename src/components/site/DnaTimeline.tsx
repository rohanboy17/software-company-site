"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ProcessStep } from "@/content/site-content";

type Rung = { y: number; x1: number; x2: number };

function AnimatedRung({
  rung,
  progress,
  start,
  end,
}: {
  rung: Rung;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const pathLength = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.line
      x1={rung.x1}
      y1={rung.y}
      x2={rung.x2}
      y2={rung.y}
      stroke="#0ea5e9"
      strokeWidth="3"
      strokeLinecap="round"
      style={{ pathLength, opacity }}
    />
  );
}

export default function DnaTimeline({ steps }: { steps: ProcessStep[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const wave1 =
    "M 100 0 C 200 100, 200 200, 100 300 C 0 400, 0 500, 100 600 C 200 700, 200 800, 100 900";
  const wave2 =
    "M 100 0 C 0 100, 0 200, 100 300 C 200 400, 200 500, 100 600 C 0 700, 0 800, 100 900";

  const rungs: Rung[] = [
    { y: 75, x1: 44, x2: 156 },
    { y: 150, x1: 25, x2: 175 },
    { y: 225, x1: 44, x2: 156 },
    { y: 375, x1: 44, x2: 156 },
    { y: 450, x1: 25, x2: 175 },
    { y: 525, x1: 44, x2: 156 },
    { y: 675, x1: 44, x2: 156 },
    { y: 750, x1: 25, x2: 175 },
    { y: 825, x1: 44, x2: 156 },
  ];

  return (
    <div 
      ref={scrollContainerRef}
      data-dna-scroll
      className="relative flex flex-col md:flex-row items-start w-full h-[70vh] min-h-[600px] max-h-[900px] rounded-[40px] border border-cyan-500/10 bg-slate-950/40 backdrop-blur-3xl overflow-y-auto overflow-x-hidden shadow-[inset_0_0_80px_rgba(34,211,238,0.02)]"
      style={{
        height: "70vh",
        minHeight: 600,
        maxHeight: 900,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            [data-dna-scroll]::-webkit-scrollbar { display: none; }
          `,
        }}
      />

      {/* LEFT SIDE: Static Container, Animated DNA */}
      <div className="sticky top-0 hidden h-[70vh] w-2/5 min-h-[600px] max-h-[900px] flex-col items-center justify-center border-r border-white/5 bg-slate-900/20 md:flex">
        <svg
          viewBox="0 0 200 900"
          className="h-full w-full max-h-[85%] drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
        >
          <path d={wave1} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <path d={wave2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />

          {rungs.map((rung, i) => (
            <line
              key={`bg-${i}`}
              x1={rung.x1}
              y1={rung.y}
              x2={rung.x2}
              y2={rung.y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
          ))}

          {!reduce ? (
            <>
              <motion.path
                d={wave1}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength: smoothProgress }}
              />
              <motion.path
                d={wave2}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength: smoothProgress }}
              />

              {rungs.map((rung, i) => {
                const start = rung.y / 900 - 0.15;
                const end = rung.y / 900;
                return (
                  <AnimatedRung key={`fg-${i}`} rung={rung} progress={smoothProgress} start={start} end={end} />
                );
              })}
            </>
          ) : null}
        </svg>
      </div>

      {/* RIGHT SIDE: Process Cards */}
      <div className="relative z-20 flex w-full flex-col gap-12 p-10 md:w-3/5 md:p-16">
        <div className="min-h-[10vh]" />

        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80, scale: 0.95, rotateX: -10 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ root: scrollContainerRef, once: false, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl md:p-10"
            style={{ transformPerspective: 1000 }}
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="inline-flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)] ring-1 ring-cyan-500/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/40">
                {index + 1}
              </span>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">Phase</p>
            </div>

            <h3 className="mt-5 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {step.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">{step.detail}</p>
          </motion.div>
        ))}

        <div className="min-h-[40vh]" />
      </div>
    </div>
  );
}
