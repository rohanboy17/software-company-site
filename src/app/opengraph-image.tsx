import { ImageResponse } from "next/og";
import { getSiteContent } from "@/lib/cms/get-site-content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const content = await getSiteContent();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 20% 10%, rgba(34,211,238,0.35), transparent 45%), radial-gradient(circle at 80% 10%, rgba(59,130,246,0.25), transparent 40%), #030712",
          color: "white",
          padding: 80,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <div style={{ fontSize: 18, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
            {content.companyName}
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05 }}>
            {content.hero.title}
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.35, color: "rgba(226,232,240,0.9)" }}>
            {content.hero.subtitle}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
            <div
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(34,211,238,0.9)",
                color: "#020617",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Performance-first
            </div>
            <div
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              Next.js + Motion
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

