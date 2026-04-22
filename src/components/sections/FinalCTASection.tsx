import Link from "next/link";
import type { SiteContent } from "@/content/site-content";
import { Chip } from "@/components/site/SectionPrimitives";

export default function FinalCTASection({ content }: { content: SiteContent }) {
  const schedulingUrl = content.company?.schedulingUrl;
  const email = content.company?.email ?? "rohanmondalpc@gmail.com";

  return (
    <section className="relative bg-[#030712] pb-28 pt-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.26),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.18),transparent_40%)] p-10 backdrop-blur-md">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Final CTA</p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Ready to build something that feels years ahead?
              </h2>
              <p className="mt-4 max-w-3xl text-slate-200 leading-relaxed">
                Share your scope and we&apos;ll reply within 1 business day with next steps, a timeline,
                and a proposal path.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Chip>Launch Sprint (2–6 weeks)</Chip>
                <Chip>Retainer</Chip>
                <Chip>Embedded</Chip>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                    Book a strategy call
                  </a>
                ) : (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Email us
                  </a>
                )}
                <p className="text-xs tracking-[0.2em] text-slate-400 uppercase sm:ml-auto">
                  Response time: 1 business day
                </p>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-slate-950/35 p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">What you get</p>
              <ul className="mt-5 space-y-3 text-sm text-slate-200">
                {[
                  "Milestone plan + delivery timeline",
                  "Performance budget for Core Web Vitals",
                  "Design + motion system direction",
                  "Clear scope and next steps",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">Guarantee</p>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  If we&apos;re not a fit, we&apos;ll tell you fast — and point you to the best next option.
                </p>
              </div>
              <Link
                href="/services"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                See pricing model
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
