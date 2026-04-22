"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import type { FAQItem } from "@/content/site-content";

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const reduce = useReducedMotion();
  const safe = useMemo(() => items.filter(Boolean).slice(0, 10), [items]);
  const [open, setOpen] = useState<string | null>(safe[0]?.q ?? null);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="p-3">
        {safe.map((item) => {
          const active = item.q === open;
          return (
            <div key={item.q} className="overflow-hidden rounded-2xl">
              <button
                type="button"
                className={`flex w-full items-center justify-between gap-6 rounded-2xl border border-white/10 px-5 py-4 text-left text-sm font-semibold transition ${
                  active ? "bg-slate-950/45 text-white" : "bg-white/5 text-white/90 hover:bg-white/10"
                }`}
                onClick={() => setOpen((prev) => (prev === item.q ? null : item.q))}
                aria-expanded={active}
              >
                <span>{item.q}</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-950/35 text-white/85">
                  {active ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {active ? (
                  <motion.div
                    key="content"
                    initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="border-x border-b border-white/10 bg-slate-950/25 px-5 pb-5 pt-4"
                  >
                    <p className="text-sm leading-7 text-slate-200">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

