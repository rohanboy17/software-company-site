"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Testimonial } from "@/content/site-content";

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const reduce = useReducedMotion();
  const items = useMemo(() => testimonials.filter(Boolean).slice(0, 8), [testimonials]);
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (items.length ? (i + 1) % items.length : 0));
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((i) => (items.length ? (i - 1 + items.length) % items.length : 0));
  }, [items.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  const current = items[index];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10">
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
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 text-white/90 transition hover:bg-slate-950/55"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div className="min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={`${index}-${current?.quote?.slice(0, 12)}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-lg leading-8 text-white"
            >
              “{current?.quote}”
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Client</p>
          <p className="mt-3 text-lg font-semibold text-white">{current?.name}</p>
          <p className="mt-2 text-sm text-slate-200">
            {current?.role} · {current?.company}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Communication", "Quality", "Speed"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-white/85 uppercase"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

