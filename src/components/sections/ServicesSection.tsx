"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { TextReveal } from "../ui/TextReveal";

const services = [
  {
    title: "AI & Machine Learning",
    description: "Intelligent systems that automate complex workflows and extract actionable insights from data.",
    icon: "🧠",
    glowColor: "rgba(168, 85, 247, 0.15)", // Purple
  },
  {
    title: "Web Engineering",
    description: "High-performance, accessible, and immersive web applications built on modern edge infrastructure.",
    icon: "⚡",
    glowColor: "rgba(34, 211, 238, 0.15)", // Cyan
  },
  {
    title: "Cloud Native Architecture",
    description: "Scalable backend systems and microservices designed for zero-downtime and massive scale.",
    icon: "☁️",
    glowColor: "rgba(59, 130, 246, 0.15)", // Blue
  },
  {
    title: "Immersive Experiences",
    description: "3D web graphics, WebGL, and spatial computing to create unforgettable digital journeys.",
    icon: "🌌",
    glowColor: "rgba(236, 72, 153, 0.15)", // Pink
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(34,211,238,0.03)_50%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <div className="text-4xl md:text-6xl font-bold mb-6">
            <TextReveal className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Capabilities
            </TextReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed"
          >
            We don&apos;t just write code. We architect solutions that redefine industry standards. Our multi-disciplinary team brings cutting-edge technology to your most complex challenges.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard glowColor={service.glowColor} className="h-full group">
                <div className="text-4xl mb-6 transform transition-transform group-hover:scale-110 group-hover:-rotate-12 origin-bottom-left">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-50 mb-4">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
                
                <div className="mt-8 flex items-center text-sm font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                  Explore <span className="ml-2">→</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
