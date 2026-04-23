"use client";

"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const coarsePointer =
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;

  if (reduce || coarsePointer) {
    return children;
  }

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
