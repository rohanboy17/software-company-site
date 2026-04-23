"use client";

import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const ServicesScene = dynamic(() => import("./ServicesScene"), { ssr: false });

export default function ServicesSceneWrapper() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, margin: "240px 0px 240px 0px" });

  const coarsePointer =
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;

  const enabled = inView && !reduce && !coarsePointer;

  return (
    <div ref={ref} className="absolute inset-0">
      {enabled ? <ServicesScene /> : null}
    </div>
  );
}
