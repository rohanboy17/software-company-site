import Link from "next/link";
import type { SiteContent } from "@/content/site-content";

export default function SiteFooter({ content }: { content: SiteContent }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#030712]">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 text-slate-200">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white">
              {content.companyName}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              {content.company?.tagline ??
                "Premium engineering studio for high-performance websites, apps, and AI products."}
            </p>
            <p className="mt-5 text-sm text-slate-300">
              <span className="text-white/70">Email:</span>{" "}
              <a className="text-white hover:text-cyan-200" href={`mailto:${content.company?.email ?? "rohanmondalpc@gmail.com"}`}>
                {content.company?.email ?? "rohanmondalpc@gmail.com"}
              </a>
            </p>
            {content.company?.phone ? (
              <p className="mt-2 text-sm text-slate-300">
                <span className="text-white/70">Phone:</span>{" "}
                <a className="text-white hover:text-cyan-200" href={`tel:${content.company.phone.replace(/\s+/g, "")}`}>
                  {content.company.phone}
                </a>
              </p>
            ) : null}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Explore</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
              <Link href="/work" className="hover:text-white">
                Work
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Legal</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </div>
            {content.company?.socials?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {content.company.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-white/85 transition hover:bg-white/10"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {year} {content.companyName}. All rights reserved.</p>
          <p className="text-slate-500">{content.company?.timezone ?? "UTC"}</p>
        </div>
      </div>
    </footer>
  );
}
