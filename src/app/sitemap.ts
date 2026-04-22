import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/cms/get-site-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();
  const baseUrl = content.siteSeo?.siteUrl ?? "https://example.com";
  const now = new Date();

  const staticRoutes = ["/", "/services", "/work", "/contact", "/privacy", "/terms"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
    }),
  );

  const serviceRoutes = content.services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...serviceRoutes];
}

