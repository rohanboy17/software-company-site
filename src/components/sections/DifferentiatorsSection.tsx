import type { SiteContent } from "@/content/site-content";
import { SectionHeader, SectionShell } from "@/components/site/SectionPrimitives";
import DifferentiatorsTabs from "@/components/site/DifferentiatorsTabs";

const fallback = [
  {
    title: "Performance",
    detail: "Core Web Vitals is a feature — we design motion and 3D around strict budgets.",
  },
  {
    title: "Design systems",
    detail: "Tokenized UI that scales across pages, campaigns, and product surfaces.",
  },
  {
    title: "Reliability",
    detail: "Hardening basics baked in: headers, validation, safe defaults, and uptime focus.",
  },
  {
    title: "AI enablement",
    detail: "Applied AI where it matters: copilots, retrieval, automation, and product workflows.",
  },
];

export default function DifferentiatorsSection({ content }: { content?: SiteContent }) {
  const items = content?.differentiators?.length ? content.differentiators : fallback;

  return (
    <SectionShell id="differentiators" variant="alt">
      <SectionHeader
        eyebrow="Differentiators"
        title="Modern engineering, the right way."
        description="Beautiful doesn't have to be heavy. We engineer interactions that feel premium and remain fast on real devices."
      />
      <div className="mt-12">
        <DifferentiatorsTabs
          tabs={[
            { key: "performance", label: "Performance", item: items[0] ?? fallback[0] },
            { key: "systems", label: "Design Systems", item: items[1] ?? fallback[1] },
            { key: "reliability", label: "Reliability", item: items[2] ?? fallback[2] },
            { key: "ai", label: "AI", item: items[3] ?? fallback[3] },
          ]}
        />
      </div>
    </SectionShell>
  );
}

