"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MobileNavProps = {
  ctaHref: string;
  ctaLabel: string;
  ctaExternal?: boolean;
};

export default function MobileNav({ ctaHref, ctaLabel, ctaExternal }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const ctaProps = useMemo(() => {
    if (!ctaExternal) return {};
    return { target: "_blank", rel: "noreferrer" } as const;
  }, [ctaExternal]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="text-lg leading-none">≡</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[9999] md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-4 top-4 w-[min(92vw,420px)] rounded-3xl border border-white/10 bg-[#030712]/95 p-6 shadow-[0_30px_120px_rgba(2,6,23,0.75)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Menu</p>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-2 text-sm text-slate-200">
              <Link
                href="/services"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/work"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Work
              </Link>
              <Link
                href="/contact"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </nav>

            <div className="mt-6">
              {ctaExternal ? (
                <a
                  href={ctaHref}
                  {...ctaProps}
                  className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  onClick={() => setOpen(false)}
                >
                  {ctaLabel}
                </a>
              ) : (
                <Link
                  href={ctaHref}
                  className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  onClick={() => setOpen(false)}
                >
                  {ctaLabel}
                </Link>
              )}
              <p className="mt-3 text-center text-xs tracking-[0.2em] text-slate-500 uppercase">
                Reply within 1 business day
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

