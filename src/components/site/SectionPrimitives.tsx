import type { ReactNode } from "react";
import { cn } from "@/components/ui/GlassCard";

export function SectionShell({
  id,
  children,
  className,
  variant = "default",
  background,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "alt" | "fade-top";
  background?: ReactNode;
}) {
  const bgClass =
    variant === "alt"
      ? "bg-[#020817]"
      : "bg-[#030712]";

  const overlay =
    variant === "fade-top"
      ? "before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-24 before:bg-[linear-gradient(180deg,rgba(2,6,23,0.85)_0%,rgba(2,6,23,0.0)_100%)]"
      : "";

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-28",
        bgClass,
        overlay,
        className,
      )}
    >
      <GlowBackdrop />
      {background}
      <div className="relative mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <Badge>{eyebrow}</Badge>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-slate-300 leading-relaxed">{description}</p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.26em] text-cyan-100 uppercase">
      {children}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-white/85 uppercase backdrop-blur-md">
      {children}
    </span>
  );
}

export function Divider() {
  return <div className="my-10 h-px w-full bg-white/10" />;
}

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-300">{label}</p>
    </div>
  );
}

export function GlowBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-80"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,0.12),transparent_32%),radial-gradient(circle_at_45%_80%,rgba(236,72,153,0.10),transparent_30%)]" />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%27.45%27/%3E%3C/svg%3E")',
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}
