"use client";

import { motion, useScroll, useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import type { SiteContent } from "@/content/site-content";

function FrameSequenceBackground({
  frameCount,
  progress,
}: {
  frameCount: number;
  progress: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmapCacheRef = useRef<Map<number, ImageBitmap>>(new Map());
  const loadingRef = useRef<Set<number>>(new Set());
  const currentIndexRef = useRef<number>(0);
  const frameCountRef = useRef<HTMLDivElement>(null);

  const drawBitmap = (canvas: HTMLCanvasElement, bitmap: ImageBitmap) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect();
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const width = Math.max(1, Math.round(cssWidth * ratio));
    const height = Math.max(1, Math.round(cssHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const scale = Math.max(cssWidth / bitmap.width, cssHeight / bitmap.height);
    const drawWidth = bitmap.width * scale;
    const drawHeight = bitmap.height * scale;
    const offsetX = (cssWidth - drawWidth) / 2;
    const offsetY = (cssHeight - drawHeight) / 2;
    ctx.drawImage(bitmap, offsetX, offsetY, drawWidth, drawHeight);
  };

  const requestBitmapRef = useRef<(index: number) => Promise<void>>(async () => {});

  useEffect(() => {
    requestBitmapRef.current = async (index: number) => {
      const safeIndex = Math.max(0, Math.min(frameCount - 1, index));
      if (bitmapCacheRef.current.has(safeIndex) || loadingRef.current.has(safeIndex)) {
        return;
      }
      loadingRef.current.add(safeIndex);
      try {
        const response = await fetch(`/api/frame-sequence/${safeIndex}`);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        bitmapCacheRef.current.set(safeIndex, bitmap);

        // Keep cache bounded
        if (bitmapCacheRef.current.size > 70) {
          const keys = [...bitmapCacheRef.current.keys()];
          keys.sort(
            (a, b) =>
              Math.abs(b - currentIndexRef.current) - Math.abs(a - currentIndexRef.current),
          );
          const removeCount = bitmapCacheRef.current.size - 70;
          for (let i = 0; i < removeCount; i += 1) {
            const key = keys[i];
            const bmp = bitmapCacheRef.current.get(key);
            bmp?.close?.();
            bitmapCacheRef.current.delete(key);
          }
        }

        // If this is still the desired frame, draw it now
        const canvas = canvasRef.current;
        if (canvas && safeIndex === currentIndexRef.current) {
          drawBitmap(canvas, bitmap);
          if (frameCountRef.current) {
            frameCountRef.current.textContent = `FRAME ${safeIndex + 1}/${frameCount}`;
          }
        }
      } finally {
        loadingRef.current.delete(safeIndex);
      }
    };
  }, [frameCount]);

  useMotionValueEvent(progress, "change", (latest) => {
    const canvas = canvasRef.current;
    if (!canvas || frameCount <= 0) return;

    const index = Math.max(
      0,
      Math.min(frameCount - 1, Math.round(latest * (frameCount - 1))),
    );
    
    if (index === currentIndexRef.current) return;
    
    currentIndexRef.current = index;
    if (frameCountRef.current) {
      frameCountRef.current.textContent = `FRAME ${index + 1}/${frameCount}`;
    }

    const cached = bitmapCacheRef.current.get(index);
    if (cached) {
      drawBitmap(canvas, cached);
    } else {
      void requestBitmapRef.current(index);
    }

    // Prefetch neighbors
    for (let offset = 1; offset <= 2; offset += 1) {
      void requestBitmapRef.current(index + offset);
      void requestBitmapRef.current(index - offset);
    }
  });

  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      const current = bitmapCacheRef.current.get(currentIndexRef.current);
      if (current && canvas) {
        drawBitmap(canvas, current);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#020817]">
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="absolute inset-0 grain" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.3)_0%,rgba(2,6,23,0.38)_35%,rgba(2,6,23,0.6)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(6,182,212,0.18),transparent_25%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.14),transparent_30%)]" />
      </div>
      <div ref={frameCountRef} className="pointer-events-none fixed right-6 top-24 z-30 rounded-full border border-white/15 bg-slate-950/45 px-4 py-2 text-xs tracking-[0.2em] text-white/85 backdrop-blur-md">
        FRAME 1/{frameCount}
      </div>
    </>
  );
}

function ServiceCard({
  title,
  description,
  outcomes,
}: {
  title: string;
  description: string;
  outcomes: string[];
}) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-slate-300">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-200">
        {outcomes.map((outcome) => (
          <li key={outcome} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            {outcome}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Homepage({
  content,
  activeVariant = "main",
  frameCount,
}: {
  content: SiteContent;
  activeVariant?: string;
  frameCount: number;
}) {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100">
      <FrameSequenceBackground frameCount={frameCount} progress={scrollYProgress} />
      {activeVariant !== "main" ? (
        <div className="pointer-events-none fixed left-6 top-24 z-30 rounded-full border border-white/15 bg-slate-950/45 px-4 py-2 text-xs tracking-[0.2em] text-white/85 backdrop-blur-md">
          VARIANT {activeVariant.toUpperCase()}
        </div>
      ) : null}

      <main className="relative z-10">
        <section
          className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 pb-16 pt-24"
        >
          <div className="grid w-full gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div
              data-depth={18}
              className="rounded-[2rem] border border-white/15 bg-slate-950/42 p-7 shadow-[0_30px_100px_rgba(8,15,40,0.45)] backdrop-blur-xl md:p-10"
            >
              <p className="inline-flex rounded-full border border-cyan-300/35 px-4 py-1 text-xs uppercase tracking-[0.28em] text-cyan-100">
                {content.hero.badge}
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
                {content.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">{content.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950">
                  {content.hero.primaryCta}
                </a>
                <a
                  href="#services"
                  className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-slate-100"
                >
                  {content.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div
              data-depth={10}
              className="rounded-[2rem] border border-white/15 bg-slate-950/35 p-6 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-cyan-100/85">Scroll Sequence</p>
              <div className="mt-5 space-y-3">
                {content.scrollStory.scenes.map((scene, index) => (
                  <div
                    key={scene}
                    className={`rounded-2xl border px-4 py-3 text-sm transition ${
                      index === 0
                        ? "border-cyan-300/70 bg-cyan-300/12 text-white"
                        : "border-white/12 bg-black/20 text-slate-200"
                    }`}
                  >
                    {scene}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-20"
        >
          <div
            data-depth={8}
            className="w-full rounded-[2rem] border border-white/12 bg-slate-950/35 p-7 backdrop-blur-xl md:p-10"
          >
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Core Services</p>
                <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                  Engineering built for depth, motion, and measurable growth.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-200">
                Every section is now layered over your frame sequence so the whole homepage feels like one cinematic system.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {content.services.map((service) => (
                <ServiceCard key={service.slug} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-20"
        >
            <div className="grid w-full gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <div
              data-depth={14}
              className="rounded-[2rem] border border-white/12 bg-slate-950/38 p-7 backdrop-blur-xl md:p-9"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Scroll Story</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">{content.scrollStory.heading}</h2>
              <p className="mt-5 text-base leading-8 text-slate-200">{content.scrollStory.intro}</p>
              <div className="mt-8 rounded-2xl border border-white/12 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/80">Background Animation</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  The full page now reads directly from your `frames_software` sequence and maps those frames to overall page scroll.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {content.caseStudies.map((study) => (
                <article key={study.client} className="rounded-[1.75rem] border border-white/12 bg-slate-950/35 p-6 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">{study.sector}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{study.client}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{study.headline}</p>
                  <p className="mt-4 text-sm font-semibold text-cyan-100">{study.impact}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-20"
        >
            <div className="grid w-full gap-6 md:grid-cols-2">
            <div
              data-depth={12}
              className="rounded-[2rem] border border-white/12 bg-slate-950/38 p-7 backdrop-blur-xl md:p-9"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Delivery Process</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">From discovery to launch, every scroll reveals progress.</h2>
            </div>
            <div className="grid gap-4">
              {content.process.map((step, index) => (
                <article key={step.title} className="rounded-[1.5rem] border border-white/12 bg-slate-950/32 p-5 backdrop-blur-xl">
                  <p className="text-sm text-cyan-100">Step {index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{step.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-20"
        >
          <div
            data-depth={16}
            className="w-full rounded-[2rem] border border-cyan-300/25 bg-slate-950/45 px-7 py-12 shadow-[0_30px_100px_rgba(8,15,40,0.45)] backdrop-blur-xl md:px-12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Ready to build?</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold text-white md:text-6xl">
              Launch a software brand experience that feels as advanced as the products you sell.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950" href="#">
                Get Proposal
              </a>
              <a className="rounded-full border border-white/30 px-6 py-3 text-sm text-white" href="#">
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/35 py-6 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 text-sm text-slate-400">
          <p>{content.companyName}</p>
          <p>Copyright {year}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
