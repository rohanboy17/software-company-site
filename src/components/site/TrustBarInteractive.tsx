"use client";

import React from "react";
import MetricCounter from "./MetricCounter";
import TiltSpotlightCard from "../ui/TiltSpotlightCard";
import { Reveal, Stagger, Item } from "./MotionPrimitives";

interface Metric {
  label: string;
  value: string;
  detail?: string;
}

export default function TrustBarInteractive({ metrics }: { metrics: Metric[] }) {
  return (
    <Reveal>
      <Stagger>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Item key={metric.label}>
              <TiltSpotlightCard className="p-8 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl font-bold tracking-tighter text-white lg:text-5xl">
                      <MetricCounter value={metric.value} />
                    </div>
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-cyan-300 uppercase shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                      Verified
                    </span>
                  </div>
                  
                  <h4 className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">
                    {metric.label}
                  </h4>
                  
                  <div className="mt-8 h-[2px] w-12 bg-gradient-to-r from-cyan-400 to-transparent rounded-full group-hover:w-full transition-all duration-700 ease-out" />
                  
                  <p className="mt-6 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                    {metric.detail || "Built with budgets, guardrails, and milestones — so it ships fast and stays fast."}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      <span className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse" />
                      Live Metric
                    </div>
                  </div>
                </div>
              </TiltSpotlightCard>
            </Item>
          ))}
        </div>
      </Stagger>
    </Reveal>
  );
}
