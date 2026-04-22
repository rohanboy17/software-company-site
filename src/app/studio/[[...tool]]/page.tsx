"use client";

import config from "../../../../sanity.config";
import { NextStudio } from "next-sanity/studio";

function MissingSanityConfig() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 text-slate-100">
      <h1 className="text-3xl font-semibold text-white">Sanity Studio Setup Required</h1>
      <p className="mt-4 text-slate-300">
        Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to `.env.local`, then restart the dev
        server.
      </p>
    </main>
  );
}

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    return <MissingSanityConfig />;
  }

  return <NextStudio config={config} />;
}
