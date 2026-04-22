import type { SiteContent } from "@/content/site-content";
import MetricCounter from "@/components/site/MetricCounter";
import { Reveal, Stagger, Item } from "@/components/site/MotionPrimitives";

const defaultMetrics = [
  { label: "Avg. Lighthouse", value: "95+" },
  { label: "Time-to-ship", value: "2–6 wks" },
  { label: "Uptime focus", value: "99.9%" },
  { label: "Design system", value: "Tokenized" },
];

export default function TrustBarSection({ content }: { content: SiteContent }) {
  const metrics = content.trust?.metrics?.length ? content.trust.metrics : defaultMetrics;
  const logos = content.trust?.logos?.length
    ? content.trust.logos
    : [{ name: "FinTech" }, { name: "HealthTech" }, { name: "SaaS" }, { name: "Logistics" }];

  return (
    <section className="relative border-t border-white/10 bg-[#030712]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <Reveal>
          <Stagger>
            <div className="grid gap-4 md:grid-cols-4">
              {metrics.map((metric) => (
                <Item key={metric.label}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md">
                    <p className="text-2xl font-semibold text-white">
                      <MetricCounter value={metric.value} />
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                      {metric.label}
                    </p>
                  </div>
                </Item>
              ))}
            </div>
          </Stagger>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {logos.slice(0, 6).map((logo) => (
            <span
              key={logo.name}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-white/80 uppercase"
            >
              {logo.name}
            </span>
          ))}
          <span className="ml-auto hidden text-xs tracking-[0.2em] text-slate-500 uppercase md:inline">
            Trusted by teams shipping worldwide.
          </span>
        </div>
      </div>
    </section>
  );
}
