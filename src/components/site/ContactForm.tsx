"use client";

import { useEffect, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, startedAt: startedAtRef.current ?? undefined }),
    });

    if (res.ok) {
      setState("success");
      form.reset();
      return;
    }

    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setState("error");
    setError(
      data.error === "email_not_configured"
        ? "Contact email isn’t configured yet. Add RESEND_API_KEY + CONTACT_TO_EMAIL in .env.local."
        : "Something went wrong. Please try again.",
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-white/70">Name</span>
          <input
            name="name"
            required
            minLength={2}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-white/70">Email</span>
          <input
            name="email"
            required
            type="email"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-white/70">Company</span>
          <input
            name="company"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
            placeholder="Company name"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-white/70">Website</span>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="mt-2 w-full rounded-2xl border border-transparent bg-transparent px-4 py-3 text-sm text-transparent outline-none"
            aria-hidden="true"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-white/70">Budget</span>
          <select
            name="budget"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
            defaultValue=""
          >
            <option value="" disabled>
              Select a range
            </option>
            <option value="$2k-$5k">$2k–$5k</option>
            <option value="$5k-$15k">$5k–$15k</option>
            <option value="$15k-$50k">$15k–$50k</option>
            <option value="$50k+">$50k+</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-white/70">Timeline</span>
          <select
            name="timeline"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
            defaultValue=""
          >
            <option value="" disabled>
              When do you want to launch?
            </option>
            <option value="2-4 weeks">2–4 weeks</option>
            <option value="1-2 months">1–2 months</option>
            <option value="3+ months">3+ months</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-white/70">Message</span>
        <textarea
          name="message"
          required
          minLength={20}
          rows={6}
          className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
          placeholder="What are you building? What does success look like?"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Sending…" : "Send request"}
        </button>
        <p className="text-sm text-slate-300">
          {state === "success" ? "Received — we’ll reply soon." : error ?? " "}
        </p>
      </div>
    </form>
  );
}
