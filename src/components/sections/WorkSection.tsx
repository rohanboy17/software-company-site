"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { MagneticButton } from "../ui/MagneticButton";

const projects = [
  {
    title: "Quantum Nexus",
    client: "FinTech Global",
    description: "A real-time trading platform utilizing WebSockets and predictive AI models.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Aura Health",
    client: "MediCare Plus",
    description: "Telemedicine application with encrypted video streaming and IoT device integration.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "EcoTrack",
    client: "Green Earth Initiative",
    description: "Global supply chain tracking using blockchain for verifiable carbon offset.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      <GlassCard className="p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image side */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay z-10" />
            <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          </div>
          
          {/* Content side */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative">
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase mb-4">
              {project.client}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {project.title}
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="mt-auto">
              <span className="inline-flex items-center text-white font-semibold group-hover:text-cyan-400 transition-colors">
                View Case Study
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function WorkSection() {
  return (
    <section className="relative py-32 bg-[#030712] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400"
            >
              Selected Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed"
            >
              We&apos;ve partnered with forward-thinking brands to deliver platforms that are not just functional, but category-defining.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <MagneticButton className="px-6 py-3 rounded-full border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition-colors shrink-0">
              View All Projects
            </MagneticButton>
          </motion.div>
        </div>

        <div className="flex flex-col gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
