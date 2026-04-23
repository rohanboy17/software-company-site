"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import { Cpu, Globe, Smartphone, Sparkles } from "lucide-react";
import type { Service, SiteContent } from "@/content/site-content";
import { SectionHeader, SectionShell } from "@/components/site/SectionPrimitives";
import { Reveal } from "@/components/site/MotionPrimitives";
import ServicesSceneWrapper from "@/components/3d/ServicesSceneWrapper";

function InteractiveServiceCard({
  service,
  iconBySlug,
}: {
  service: Service;
  iconBySlug: Record<string, React.ReactNode>;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Hover Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  function onMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yScroll = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scaleScroll = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        y: reduce ? 0 : yScroll,
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        scale: reduce ? 1 : scaleScroll,
        transformStyle: "preserve-3d",
      }}
      className="relative group h-full"
    >
      <Link href={`/services/${service.slug}`} className="block h-full">
        <div className="h-full rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl transition-colors hover:border-cyan-500/30 shadow-2xl relative overflow-hidden">
          {/* Internal 3D Content */}
          <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.span 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                >
                  {iconBySlug[service.slug] ?? <Sparkles className="h-5 w-5" />}
                </motion.span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{service.title}</h3>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 text-white/80 group-hover:bg-cyan-500/20 group-hover:text-cyan-200 group-hover:scale-110 transition-all">
                →
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-300">{service.description}</p>

            <div className="mt-8 grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
              {service.outcomes.slice(0, 4).map((outcome: string) => (
                <div key={outcome} className="flex items-center gap-2 group/item">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 group-hover/item:scale-150 transition-transform" />
                  {outcome}
                </div>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 group-hover:text-cyan-300">
              Explore service <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Mouse Spotlight Effect */}
          <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(34,211,238,0.15)_0%,transparent_80%)]" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesGridSection({ content }: { content: SiteContent }) {
  const iconBySlug: Record<string, React.ReactNode> = {
    "website-development": <Globe className="h-6 w-6" />,
    "mobile-app-development": <Smartphone className="h-6 w-6" />,
    "software-development": <Cpu className="h-6 w-6" />,
    "ai-development": <Sparkles className="h-6 w-6" />,
  };

  return (
    <SectionShell 
      id="services" 
      className="bg-[#030712] relative overflow-hidden"
      background={<ServicesSceneWrapper />}
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-0 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 -z-10 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_60%)] blur-3xl" />

      <SectionHeader
        eyebrow="What we do"
        title="Outcomes-first product engineering."
        description="We build fast, accessible systems that scale — with a motion language that elevates your brand without sacrificing performance."
        right={
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-cyan-500/10 hover:border-cyan-400"
          >
            View all services
          </Link>
        }
      />

      <Reveal delay={0.05}>
        <div className="mt-16 grid gap-8 md:grid-cols-2 relative z-10">
          {content.services.map((service) => (
            <InteractiveServiceCard 
              key={service.slug} 
              service={service} 
              iconBySlug={iconBySlug} 
            />
          ))}
        </div>
      </Reveal>

      <div className="mt-20 relative z-10 rounded-[40px] border border-white/10 bg-slate-900/40 p-12 backdrop-blur-2xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">Core Metrics</p>
        <h3 className="mt-4 text-4xl font-bold text-white tracking-tight">
          Built for speed, scale, and AI readiness.
        </h3>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {[
            { label: "Performance", value: "95+ Lighthouse", color: "from-cyan-400 to-blue-500" },
            { label: "SEO", value: "100 Score", color: "from-blue-400 to-indigo-500" },
            { label: "Scalability", value: "Modular SDK", color: "from-cyan-500 to-cyan-300" },
            { label: "AI Support", value: "Native RAG", color: "from-indigo-500 to-purple-500" },
          ].map((m) => (
            <div key={m.label} className="relative group/metric">
              <div className={`h-1 w-12 bg-gradient-to-r ${m.color} mb-4 rounded-full transition-all group-hover/metric:w-24`} />
              <p className="text-2xl font-bold text-white tracking-tight">{m.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

