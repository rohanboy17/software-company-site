import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/cms/get-site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const content = await getSiteContent();
  return content.services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const content = await getSiteContent();
  const { slug } = await params;
  const service = content.services.find((item) => item.slug === slug);
  const schedulingUrl = content.company?.schedulingUrl;

  if (!service) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 text-slate-100">
      <Link href="/services" className="text-sm text-cyan-100">
        Back to all services
      </Link>
      <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">{service.title}</h1>
      <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">{service.description}</p>

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
            Book a call
          </a>
        ) : null}
      </div>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Expected outcomes</h2>
        <ul className="mt-4 space-y-3 text-slate-200">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              {outcome}
            </li>
          ))}
        </ul>
      </section>

      {service.features?.length ? (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">What&apos;s included</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-white/10 bg-slate-950/35 px-5 py-4 text-sm text-slate-100"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {service.faqs?.length ? (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">FAQ</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
                <p className="text-sm font-semibold text-white">{faq.q}</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
