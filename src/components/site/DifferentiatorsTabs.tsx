"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { AnimatedDiagram, MockupPanel } from "@/components/site/MediaPrimitives";
import type { Differentiator } from "@/content/site-content";

type Tab = {
  key: string;
  label: string;
  item: Differentiator;
};

export default function DifferentiatorsTabs({ tabs }: { tabs: Tab[] }) {
  const reduce = useReducedMotion();
  const safeTabs = useMemo(() => tabs.filter(Boolean).slice(0, 6), [tabs]);
  const [active, setActive] = useState(safeTabs[0]?.key ?? "performance");

  const current = safeTabs.find((t) => t.key === active) ?? safeTabs[0];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex flex-wrap gap-2 border-b border-white/10 p-3">
        {safeTabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`relative rounded-full px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase transition ${
                isActive ? "text-slate-950" : "text-white/80 hover:text-white"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-cyan-300"
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                />
              ) : null}
              <span className="relative z-10">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.key}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Why it matters</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{current?.item.title}</h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200">
                  {current?.item.detail}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Craft", value: "Premium motion" },
                    { label: "Quality", value: "Production-grade" },
                    { label: "Speed", value: "Milestones" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-3xl border border-white/10 bg-slate-950/35 p-5"
                    >
                      <p className="text-base font-semibold text-white">{metric.value}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {current?.item.media?.type === "diagram" ? (
                <div className="rounded-[28px] border border-white/10 bg-slate-950/40 p-4">
                  <AnimatedDiagram
                    variant={
                      current.item.media.variant === "architecture" ? "architecture" : "flow"
                    }
                    className="min-h-[280px]"
                  />
                </div>
              ) : (
                <MockupPanel
                  variant={
                    current?.item.media?.variant === "mobile" ||
                    current?.item.media?.variant === "ai" ||
                    current?.item.media?.variant === "cms"
                      ? current.item.media.variant
                      : "dashboard"
                  }
                  title={current?.item.media?.alt ?? current?.item.title}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
