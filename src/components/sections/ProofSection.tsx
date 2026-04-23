import Link from "next/link";
import Image from "next/image";
import type { SiteContent } from "@/content/site-content";
import { getSanityImageUrl } from "@/lib/cms/image-url";
import { SectionHeader, SectionShell, Chip } from "@/components/site/SectionPrimitives";
import { Reveal, Stagger, Item } from "@/components/site/MotionPrimitives";
import SpotlightCard from "@/components/ui/SpotlightCard";
import WorkSceneWrapper from "@/components/3d/WorkSceneWrapper";

function StudyImage({ src, alt }: { src: string | null; alt: string }) {
  if (!src) return null;
  return (
    <div className="relative mb-6 h-56 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05)_0%,rgba(2,6,23,0.75)_100%)]" />
    </div>
  );
}

export default function ProofSection({ content }: { content: SiteContent }) {
  const studies = content.caseStudies.slice(0, 3);
  const featured = studies[0];
  const rest = studies.slice(1);

  return (
    <SectionShell id="work" className="relative overflow-hidden bg-[#030712]">
      {/* Abstract AI Robot Scene */}
      <WorkSceneWrapper />
      
      {/* Background ambient glow to merge with the scene */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_60%)] blur-3xl" />

      <div className="relative z-10 pointer-events-auto">
        <SectionHeader
          eyebrow="Proof"
          title="Case studies with measurable impact."
          description="Product strategy, engineering rigor, and design craft — delivered with performance budgets so the experience stays premium on real devices."
          right={
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/5 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
            >
              See all work <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          }
        />
      </div>

      <Reveal delay={0.05}>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featured ? (
            <div className="lg:col-span-2">
              <SpotlightCard className="p-9">
                <StudyImage
                  src={
                    featured.imageUrl ||
                    getSanityImageUrl(featured.image, { width: 1400, height: 820 }) ||
                    null
                  }
                  alt={featured.client}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Chip>{featured.sector}</Chip>
                  <Chip>{featured.timeline ?? "Launch sprint"}</Chip>
                  {featured.stack?.length ? <Chip>{featured.stack.slice(0, 3).join(" · ")}</Chip> : null}
                </div>
                <h3 className="mt-6 text-3xl font-semibold text-white">{featured.client}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-200">{featured.headline}</p>

                {featured.results?.length ? (
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {featured.results.slice(0, 3).map((r) => (
                      <div
                        key={r.label}
                        className="rounded-2xl border border-white/10 bg-slate-950/35 px-5 py-4"
                      >
                        <p className="text-lg font-semibold text-white">{r.value}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                          {r.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                    {featured.impact}
                  </p>
                  <Link href="/contact" className="text-sm font-semibold text-cyan-200 hover:text-cyan-100">
                    Build something similar →
                  </Link>
                </div>
              </SpotlightCard>
            </div>
          ) : null}

          <Stagger>
            <div className="grid gap-6">
              {rest.map((study) => (
                <Item key={`${study.client}-${study.impact}`}>
                  <SpotlightCard className="p-8">
                    <StudyImage
                      src={
                        study.imageUrl ||
                        getSanityImageUrl(study.image, { width: 1000, height: 700 }) ||
                        null
                      }
                      alt={study.client}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip>{study.sector}</Chip>
                      {study.timeline ? <Chip>{study.timeline}</Chip> : null}
                    </div>
                    <h4 className="mt-5 text-2xl font-semibold text-white">{study.client}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{study.headline}</p>
                    <p className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-slate-950/30 px-4 py-2 text-xs tracking-[0.2em] text-white/85">
                      {study.impact}
                    </p>
                  </SpotlightCard>
                </Item>
              ))}
            </div>
          </Stagger>
        </div>
      </Reveal>
    </SectionShell>
  );
}

