import type { SiteContent } from "@/content/site-content";
import { SectionHeader, SectionShell } from "@/components/site/SectionPrimitives";
import { Reveal } from "@/components/site/MotionPrimitives";
import { AnimatedDiagram, MockupPanel } from "@/components/site/MediaPrimitives";
import DnaTimeline from "@/components/site/DnaTimeline";

export default function ProcessSection({ content }: { content: SiteContent }) {
  return (
    <SectionShell id="process" className="bg-[#030712] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.03)_0%,transparent_70%)] blur-3xl" />

      <SectionHeader
        eyebrow="How we deliver"
        title="A calm process. A fast outcome."
        description="Clear milestones, tight feedback loops, and engineering practices that keep quality high and risk low."
      />

      <Reveal delay={0.05}>
        <div className="mt-8 relative z-10">
          <DnaTimeline steps={content.process} />
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[36px] border border-white/10 bg-slate-900/35 p-6 backdrop-blur-xl">
            <AnimatedDiagram variant="architecture" className="min-h-[300px]" />
          </div>
          <MockupPanel variant="dashboard" title="Client delivery cockpit" className="p-4" />
        </div>
      </Reveal>

      {/* Stats row below the timeline */}
      <div className="mt-12 grid gap-4 md:grid-cols-4 relative z-10">
        {[
          { label: "Typical sprint", value: "2-6 weeks", detail: "Fast delivery" },
          { label: "Communication", value: "Async + Slack", detail: "Total transparency" },
          { label: "Quality", value: "99.9% Uptime", detail: "Enterprise grade" },
          { label: "Ownership", value: "Full IP", detail: "Your code, always" },
        ].map((m) => (
          <div key={m.label} className="group rounded-[32px] border border-white/5 bg-slate-900/40 p-8 backdrop-blur-xl transition-all hover:bg-slate-900/60 hover:border-cyan-500/20">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-400 group-hover:text-cyan-300 transition-colors">{m.label}</p>
            <p className="mt-4 text-2xl font-bold text-white tracking-tight">{m.value}</p>
            <p className="mt-1 text-xs text-slate-500 group-hover:text-slate-400">{m.detail}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
