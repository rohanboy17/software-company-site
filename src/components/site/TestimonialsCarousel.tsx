"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import type { Testimonial } from "@/content/site-content";
import { MockupPanel } from "@/components/site/MediaPrimitives";

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const reduce = useReducedMotion();
  const items = useMemo(() => testimonials.filter(Boolean).slice(0, 8), [testimonials]);
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((currentIndex) => (items.length ? (currentIndex + 1) % items.length : 0));
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((currentIndex) => (items.length ? (currentIndex - 1 + items.length) % items.length : 0));
  }, [items.length]);

  const current = items[index];

  return (
    <div
      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") next();
        if (event.key === "ArrowLeft") prev();
      }}
      aria-label="Client testimonials carousel"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.25em] text-white/70">
          {items.length ? `${index + 1} / ${items.length}` : "Testimonials"}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 text-white/90 transition hover:bg-slate-950/55"
            aria-label="Previous testimonial"
          >
            &lt;-
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 text-white/90 transition hover:bg-slate-950/55"
            aria-label="Next testimonial"
          >
            -&gt;
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-end">
        <div className="min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${current?.quote?.slice(0, 12)}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <blockquote className="text-lg leading-8 text-white">&quot;{current?.quote}&quot;</blockquote>
              {current?.outcome ? (
                <p className="mt-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                  {current.outcome}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid gap-4">
          <MockupPanel
            variant={
              current?.media?.variant === "mobile" ||
              current?.media?.variant === "ai" ||
              current?.media?.variant === "cms"
                ? current.media.variant
                : "dashboard"
            }
            title={current?.media?.alt ?? "Client outcome"}
            className="p-3"
          />
          <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Client</p>
            <p className="mt-3 text-lg font-semibold text-white">{current?.name}</p>
            <p className="mt-2 text-sm text-slate-200">
              {current?.role} / {current?.company}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Communication", "Quality", "Speed"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/85"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
