import type { SiteContent } from "@/content/site-content";
import { SectionHeader, SectionShell } from "@/components/site/SectionPrimitives";
import { Reveal, Stagger, Item } from "@/components/site/MotionPrimitives";
import ProcessTimeline from "@/components/site/ProcessTimeline";

export default function ProcessSection({ content }: { content: SiteContent }) {
  return (
    <SectionShell id="process">
      <SectionHeader
        eyebrow="How we deliver"
        title="A calm process. A fast outcome."
        description="Clear milestones, tight feedback loops, and engineering practices that keep quality high and risk low."
      />

      <Reveal delay={0.05}>
        <div className="mt-12">
          <ProcessTimeline steps={content.process} />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Stagger>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { label: "Typical sprint", value: "2–6 weeks" },
              { label: "Communication", value: "Async + weekly" },
              { label: "Quality", value: "QA + budgets" },
              { label: "Handoff", value: "Docs + ownership" },
            ].map((m) => (
              <Item key={m.label}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md">
                  <p className="text-lg font-semibold text-white">{m.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{m.label}</p>
                </div>
              </Item>
            ))}
          </div>
        </Stagger>
      </Reveal>
    </SectionShell>
  );
}
