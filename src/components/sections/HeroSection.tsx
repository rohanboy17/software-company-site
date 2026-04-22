"use client";

import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useMemo, useRef, useSyncExternalStore } from "react";
import type { SiteContent } from "@/content/site-content";
import { TextReveal } from "../ui/TextReveal";
import { MagneticLink } from "../ui/MagneticLink";

const HeroScene = dynamic(() => import("../3d/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-transparent" />,
});

const CustomCursor = dynamic(
  () => import("../ui/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);

function splitHeadline(title: string): [string, string | null] {
  const explicit = title.split("|").map((part) => part.trim()).filter(Boolean);
  if (explicit.length >= 2) return [explicit[0], explicit.slice(1).join(" | ")];

  const words = title.trim().split(/\s+/);
  if (words.length <= 4) return [title, null];

  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export default function HeroSection({ content }: { content: SiteContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const showHero = useMemo(() => hydrated && inView, [hydrated, inView]);
  const [headlineA, headlineB] = useMemo(() => splitHeadline(content.hero.title), [content.hero.title]);
  const schedulingUrl = content.company?.schedulingUrl;
  const primaryHref = schedulingUrl || "/contact";
  const primaryTarget = schedulingUrl ? "_blank" : undefined;
  const primaryRel = schedulingUrl ? "noreferrer" : undefined;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030712]${
        showHero ? " cursor-none" : ""
      }`}
    >
      {/* 3D Background */}
      {showHero ? (
        <>
          <HeroScene />
          <CustomCursor />
        </>
      ) : (
        <div className="absolute inset-0 z-0 bg-transparent" />
      )}

      {/* Glow Effects */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 cursor-pointer hover:bg-white/10 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-cyan-50 uppercase">
            {content.hero.badge}
          </span>
        </motion.div>

        <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
          <TextReveal className="justify-center text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
            {headlineA}
          </TextReveal>
          {headlineB ? (
            <TextReveal
              delay={0.2}
              className="justify-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
            >
              {headlineB}
            </TextReveal>
          ) : null}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <MagneticLink
            href={primaryHref}
            target={primaryTarget}
            rel={primaryRel}
            className="px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-colors shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]"
          >
            {content.hero.primaryCta}
          </MagneticLink>
          <MagneticLink
            href="/work"
            className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 backdrop-blur-md transition-colors hover:border-white/20"
          >
            {content.hero.secondaryCta}
          </MagneticLink>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
}
