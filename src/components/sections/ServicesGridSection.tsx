import Link from "next/link";
import type { SiteContent } from "@/content/site-content";
import { SectionHeader, SectionShell, Chip } from "@/components/site/SectionPrimitives";
import { Reveal, Stagger, Item } from "@/components/site/MotionPrimitives";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Cpu, Globe, Smartphone, Sparkles } from "lucide-react";

export default function ServicesGridSection({ content }: { content: SiteContent }) {
  const iconBySlug: Record<string, React.ReactNode> = {
    "website-development": <Globe className="h-5 w-5" />,
    "mobile-app-development": <Smartphone className="h-5 w-5" />,
    "software-development": <Cpu className="h-5 w-5" />,
    "ai-development": <Sparkles className="h-5 w-5" />,
  };

  return (
    <SectionShell id="services">
      <SectionHeader
        eyebrow="What we do"
        title="Outcomes-first product engineering."
        description="We build fast, accessible systems that scale — with a motion language that elevates your brand without sacrificing performance."
        right={
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View all services
          </Link>
        }
      />

      <Reveal delay={0.05}>
        <Stagger>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {content.services.map((service) => (
              <Item key={service.slug}>
                <Link href={`/services/${service.slug}`} className="block">
                  <SpotlightCard className="p-8">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 text-white/85">
                          {iconBySlug[service.slug] ?? <Sparkles className="h-5 w-5" />}
                        </span>
                        <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                      </div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 text-white/80">
                        →
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-200">{service.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {(service.features?.length ? service.features : service.outcomes)
                        .slice(0, 4)
                        .map((item) => (
                          <Chip key={item}>{item}</Chip>
                        ))}
                    </div>

                    <div className="mt-7 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                      {service.outcomes.slice(0, 4).map((outcome) => (
                        <div key={outcome} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          {outcome}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                      Explore service <span className="text-cyan-300">→</span>
                    </div>
                  </SpotlightCard>
                </Link>
              </Item>
            ))}
          </div>
        </Stagger>
      </Reveal>

      <div className="mt-14 rounded-3xl border border-white/10 bg-slate-950/35 p-10 backdrop-blur-md">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Comparison</p>
        <h3 className="mt-3 text-3xl font-semibold text-white">
          Built for speed, scale, and AI readiness.
        </h3>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            { label: "Speed", value: "Budgeted CWV" },
            { label: "SEO", value: "Structured" },
            { label: "Scalability", value: "Modular" },
            { label: "AI-ready", value: "Integrated" },
          ].map((m) => (
            <div key={m.label} className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <p className="text-lg font-semibold text-white">{m.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

