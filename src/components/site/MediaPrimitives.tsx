"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/components/ui/GlassCard";

type MediaFrameProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export function MediaFrame({ children, className, label }: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/45 shadow-2xl backdrop-blur-xl",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_32%,rgba(34,211,238,0.08))]" />
      {label ? (
        <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-slate-950/65 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
          {label}
        </div>
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function VideoPreview({
  src,
  poster,
  label = "Preview",
  className,
}: {
  src?: string;
  poster?: string;
  label?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { amount: 0.3 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;

    if (inView) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, reduce]);

  return (
    <MediaFrame label={label} className={cn("aspect-video", className)}>
      <div ref={wrapperRef} className="relative h-full min-h-[220px] w-full">
        {src ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            aria-label={label}
          >
            <source src={src} />
          </video>
        ) : poster ? (
          <Image src={poster} alt={label} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        ) : (
          <AnimatedDiagram variant="flow" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.52)_100%)]" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/70">
          <span>{src && !reduce ? "Motion enabled" : "Static fallback"}</span>
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
        </div>
      </div>
    </MediaFrame>
  );
}

export function MockupPanel({
  variant = "dashboard",
  title,
  className,
}: {
  variant?: "dashboard" | "mobile" | "ai" | "cms";
  title?: string;
  className?: string;
}) {
  const rows = {
    dashboard: ["Pipeline velocity", "Qualified leads", "Activation rate"],
    mobile: ["Onboarding", "Retention", "Push journeys"],
    ai: ["Retrieval", "Guardrails", "Human review"],
    cms: ["Campaign pages", "SEO fields", "Publishing flow"],
  }[variant];

  return (
    <MediaFrame label={title ?? variant} className={cn("p-5", className)}>
      <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
          <span className="ml-auto text-[10px] uppercase tracking-[0.22em] text-slate-500">Live system</span>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">{row}</p>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: "20%" }}
                    whileInView={{ width: variant === "ai" ? "82%" : "68%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-cyan-300"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="relative min-h-[180px] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(34,211,238,0.12),rgba(15,23,42,0.85)_48%,rgba(99,102,241,0.16))] p-4">
            <AnimatedDiagram variant={variant === "ai" ? "ai" : "flow"} />
          </div>
        </div>
      </div>
    </MediaFrame>
  );
}

export function AnimatedDiagram({
  variant = "flow",
  className,
}: {
  variant?: "flow" | "ai" | "architecture";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const points =
    variant === "ai"
      ? [
          ["12%", "28%"],
          ["48%", "18%"],
          ["82%", "34%"],
          ["60%", "72%"],
          ["22%", "68%"],
        ]
      : [
          ["14%", "50%"],
          ["36%", "26%"],
          ["62%", "52%"],
          ["84%", "30%"],
          ["70%", "78%"],
        ];

  return (
    <div className={cn("relative h-full min-h-[180px] w-full", className)}>
      <svg viewBox="0 0 320 220" className="h-full w-full" role="img" aria-label={`${variant} diagram`}>
        <defs>
          <linearGradient id={`line-${variant}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M42 110 C98 38 150 52 198 112 S268 104 282 66"
          fill="none"
          stroke={`url(#line-${variant})`}
          strokeWidth="2"
          strokeDasharray={reduce ? undefined : "8 10"}
        >
          {!reduce ? <animate attributeName="stroke-dashoffset" from="80" to="0" dur="7s" repeatCount="indefinite" /> : null}
        </path>
        <path
          d="M54 160 C112 112 152 170 198 112 S244 120 266 172"
          fill="none"
          stroke={`url(#line-${variant})`}
          strokeWidth="2"
          opacity="0.65"
          strokeDasharray={reduce ? undefined : "6 12"}
        >
          {!reduce ? <animate attributeName="stroke-dashoffset" from="0" to="72" dur="8s" repeatCount="indefinite" /> : null}
        </path>
        {points.map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="18" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.14)" />
            <circle cx={cx} cy={cy} r="5" fill={index % 2 ? "#60a5fa" : "#22d3ee"}>
              {!reduce ? <animate attributeName="r" values="4;7;4" dur={`${2.4 + index * 0.2}s`} repeatCount="indefinite" /> : null}
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function CaseStudyMedia({
  image,
  alt,
  video,
  poster,
}: {
  image?: string | null;
  alt: string;
  video?: string;
  poster?: string;
}) {
  if (video || poster) {
    return <VideoPreview src={video} poster={poster ?? image ?? undefined} label={`${alt} preview`} />;
  }

  if (!image) {
    return <MockupPanel variant="dashboard" title={`${alt} system`} />;
  }

  return (
    <MediaFrame label="Case study" className="aspect-[16/10]">
      <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05)_0%,rgba(2,6,23,0.7)_100%)]" />
    </MediaFrame>
  );
}
