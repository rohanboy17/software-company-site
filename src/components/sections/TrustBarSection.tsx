import type { SiteContent } from "@/content/site-content";
import MetricCounter from "@/components/site/MetricCounter";
import { Reveal, Stagger, Item } from "@/components/site/MotionPrimitives";
import SpotlightCard from "@/components/ui/SpotlightCard";

const defaultMetrics = [
  { label: "Avg. Lighthouse", value: "95+" },
  { label: "Time-to-ship", value: "2–6 wks" },
  { label: "Performance budget", value: "Strict" },
  { label: "Delivery model", value: "Milestones" },
];

export default function TrustBarSection({ content }: { content: SiteContent }) {
  const metrics = content.trust?.metrics?.length ? content.trust.metrics : defaultMetrics;
  const logos = content.trust?.logos?.length
    ? content.trust.logos
    : [{ name: "FinTech" }, { name: "HealthTech" }, { name: "SaaS" }, { name: "Logistics" }];

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#030712]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(34,211,238,0.12),transparent_45%),radial-gradient(circle_at_85%_25%,rgba(59,130,246,0.10),transparent_40%)]" />
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <Reveal>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/70">Proof</p>
              <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                Performance-first delivery, measured not promised.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-300">
              Trusted by teams shipping worldwide — optimized for Core Web Vitals, reliability, and clean handoffs.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <Stagger>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {metrics.map((metric) => (
                <Item key={metric.label}>
                  <SpotlightCard className="px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-2xl font-semibold text-white md:text-3xl">
                        <MetricCounter value={metric.value} />
                      </p>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.22em] text-white/70 uppercase">
                        Verified
                      </span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                      {metric.label}
                    </p>
                    <div className="mt-4 h-px w-full bg-gradient-to-r from-cyan-300/40 via-white/10 to-transparent" />
                    <p className="mt-3 text-sm text-slate-200/90">
                      Built with budgets, guardrails, and milestones — so it ships fast and stays fast.
                    </p>
                  </SpotlightCard>
                </Item>
              ))}
            </div>
          </Stagger>
        </Reveal>

        <div className="mt-10">
          <Reveal delay={0.05}>
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">Industries</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-4 marquee rounded-3xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
              <div className="marquee-track flex w-max items-center gap-3">
                {logos.slice(0, 8).map((logo) => (
                  <span
                    key={logo.name}
                    className="group relative rounded-full border border-white/10 bg-slate-950/35 px-5 py-2 text-xs tracking-[0.22em] text-white/80 uppercase transition hover:border-white/20 hover:bg-white/10"
                  >
                    <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(120px_circle_at_50%_50%,rgba(34,211,238,0.25),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {logo.name}
                  </span>
                ))}

                {logos.slice(0, 8).map((logo) => (
                  <span
                    key={`${logo.name}-dup`}
                    aria-hidden="true"
                    className="group relative rounded-full border border-white/10 bg-slate-950/35 px-5 py-2 text-xs tracking-[0.22em] text-white/80 uppercase transition hover:border-white/20 hover:bg-white/10"
                  >
                    <span className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(120px_circle_at_50%_50%,rgba(34,211,238,0.25),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {logo.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-4 text-sm text-slate-300">Trusted by teams shipping worldwide.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
