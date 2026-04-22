"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const initial = reduce ? { opacity: 0 } : { opacity: 0, y };
  const animate = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  delayChildren = 0.05,
  staggerChildren = 0.08,
}: {
  children: ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  const reduce = useReducedMotion();
  const variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: reduce ? {} : { delayChildren, staggerChildren },
    },
  } as const;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  y = 14,
}: {
  children: ReactNode;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
  } as const;

  return (
    <motion.div variants={variants} transition={{ duration: 0.6, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

