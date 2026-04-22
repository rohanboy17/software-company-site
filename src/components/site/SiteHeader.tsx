import Link from "next/link";
import type { SiteContent } from "@/content/site-content";
import MobileNav from "@/components/site/MobileNav";

export default function SiteHeader({ content }: { content: SiteContent }) {
  const schedulingUrl = content.company?.schedulingUrl;
  const ctaHref = schedulingUrl || "/contact";
  const ctaLabel = schedulingUrl ? "Book a call" : "Request a quote";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/55 backdrop-blur-xl">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to content
      </a>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white">
            N
          </span>
          <span className="text-sm font-semibold tracking-[0.18em] text-slate-100 uppercase">
            {content.companyName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-slate-200 md:flex">
          <Link href="/services" className="transition hover:text-white">
            Services
          </Link>
          <Link href="/work" className="transition hover:text-white">
            Work
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <MobileNav ctaHref={ctaHref} ctaLabel={ctaLabel} ctaExternal={!!schedulingUrl} />
          {schedulingUrl ? (
          <a
            href={schedulingUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Book a call
          </a>
        ) : (
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Request a quote
          </Link>
        )}
        </div>
      </div>
    </header>
  );
}
