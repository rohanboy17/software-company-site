import Link from "next/link";
import { getSiteContent } from "@/lib/cms/get-site-content";

export default async function ServicesPage() {
  const content = await getSiteContent();
  const schedulingUrl = content.company?.schedulingUrl;

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 text-slate-100">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Services</p>
      <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
        Engineering services for modern teams.
      </h1>
      <p className="mt-4 max-w-3xl text-slate-300">
        Strategy, design, engineering, and performance — packaged as a calm process with clear milestones.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {content.services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.07]"
          >
            <div className="flex items-start justify-between gap-6">
              <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 text-white/80 transition group-hover:bg-slate-950/55">
                →
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-200">{service.description}</p>
            <ul className="mt-6 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              {service.outcomes.slice(0, 4).map((outcome) => (
                <li key={outcome} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  {outcome}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>

      <section className="mt-14 rounded-3xl border border-white/10 bg-slate-950/35 p-10 backdrop-blur-md">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Engagement</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Choose a delivery model that reduces risk.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Fixed scope",
              detail: "Best for well-defined builds with clear deliverables and a launch date.",
            },
            {
              title: "Monthly retainer",
              detail: "Best for iterative product work, ongoing improvements, and roadmap execution.",
            },
            {
              title: "Team augmentation",
              detail: "Best when you need senior execution embedded with your in-house team.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-200">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Request a quote
          </Link>
          {schedulingUrl ? (
            <a
              href={schedulingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Book a call
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}
