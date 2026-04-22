"use client";

import { useEffect } from "react";

export default function DevVitals() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    let cancelled = false;
    void (async () => {
      const webVitals = await import("web-vitals");
      if (cancelled) return;

      const log = (metric: unknown) => {
        // Keep this lightweight and dev-only.
        console.log("[vitals]", metric);
      };

      webVitals.onCLS(log);
      webVitals.onINP(log);
      webVitals.onLCP(log);
      webVitals.onFCP(log);
      webVitals.onTTFB(log);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
