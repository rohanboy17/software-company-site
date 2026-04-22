import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/cms/get-site-content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const content = await getSiteContent();
  const baseUrl = content.siteSeo?.siteUrl ?? "https://example.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

