import Link from "next/link";
import Image from "next/image";
import { getSiteContent } from "@/lib/cms/get-site-content";
import { getSanityImageUrl } from "@/lib/cms/image-url";

export const metadata = {
  title: "Work | NovaAxis Labs",
  description: "Selected case studies and product launches delivered by NovaAxis Labs.",
};

export default async function WorkPage() {
  const content = await getSiteContent();

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 text-slate-100">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Work</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Proof, not promises.</h1>
      <p className="mt-4 max-w-3xl text-slate-300">
        A small selection of engagements where performance, design craft, and engineering quality
        compound into measurable results.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {content.caseStudies.map((study) => (
          <article
            key={`${study.client}-${study.headline}`}
            className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.07]"
          >
            {(() => {
              const src =
                study.imageUrl ||
                getSanityImageUrl(study.image, { width: 1200, height: 740 }) ||
                null;

              return src ? (
                <div className="relative mb-6 h-56 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35">
                  <Image
                    src={src}
                    alt={study.client}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05)_0%,rgba(2,6,23,0.7)_100%)]" />
                </div>
              ) : null;
            })()}
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/90">
                  {study.sector}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{study.client}</h2>
              </div>
              <p className="shrink-0 rounded-full border border-white/10 bg-slate-950/30 px-4 py-2 text-xs tracking-[0.2em] text-white/80">
                {study.impact}
              </p>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-200">{study.headline}</p>

            {study.problem ? (
              <p className="mt-4 text-sm leading-7 text-slate-300">
                <span className="text-white/80">Problem:</span> {study.problem}
              </p>
            ) : null}
            {study.approach ? (
              <p className="mt-3 text-sm leading-7 text-slate-300">
                <span className="text-white/80">Approach:</span> {study.approach}
              </p>
            ) : null}

            {study.results?.length ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {study.results.slice(0, 4).map((r) => (
                  <div
                    key={`${study.client}-${r.label}`}
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

            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              {study.timeline ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  {study.timeline}
                </span>
              ) : null}
              {study.stack?.length ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  {study.stack.slice(0, 3).join(" · ")}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Strategy → Build → Launch
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                Core Web Vitals
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Conversion UX
              </span>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-14 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.14),transparent_40%)] p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Ready to ship?</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Let&apos;s map your next release in 30 minutes.
        </h2>
        <p className="mt-4 max-w-3xl text-slate-200">
          We&apos;ll audit your current stack, align on goals, and outline a delivery plan with clear
          milestones.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Request a quote
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore services
          </Link>
        </div>
      </section>
    </main>
  );
}
