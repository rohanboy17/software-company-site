import { getSiteContent } from "@/lib/cms/get-site-content";
import ContactForm from "@/components/site/ContactForm";

export const metadata = {
  title: "Contact | NovaAxis Labs",
  description: "Request a quote or book a strategy call with NovaAxis Labs.",
};

export default async function ContactPage() {
  const content = await getSiteContent();
  const schedulingUrl = content.company?.schedulingUrl;
  const salesEmail = content.company?.email ?? "rohanmondalpc@gmail.com";
  const phone = content.company?.phone;

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16 text-slate-100">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Contact</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Start your next build.</h1>
      <p className="mt-4 max-w-3xl text-slate-300">
        Tell us what you&apos;re launching and we&apos;ll reply with next steps, timelines, and a clear
        proposal path.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-white">Request a quote</h2>
          <p className="mt-2 text-sm text-slate-300">
            We typically respond within 1 business day.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-slate-950/35 p-8 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-white">Prefer a call?</h2>
          <p className="mt-2 text-sm text-slate-300">
            Book a 30 minute strategy session — we&apos;ll review goals, scope, and success metrics.
          </p>

          {schedulingUrl ? (
            <a
              href={schedulingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Book a strategy call
            </a>
          ) : (
            <a
              href={`mailto:${salesEmail}`}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Email us
            </a>
          )}

          <div className="mt-8 space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Email</p>
              <p className="mt-2 text-white">{salesEmail}</p>
            </div>
            {phone ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">Phone</p>
                <p className="mt-2 text-white">
                  <a className="hover:text-cyan-200" href={`tel:${phone.replace(/\s+/g, "")}`}>
                    {phone}
                  </a>
                </p>
              </div>
            ) : null}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Timezone</p>
              <p className="mt-2 text-white">{content.company?.timezone ?? "UTC+05:30"}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
