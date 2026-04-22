import { siteContent as localSiteContent, type SiteContent } from "@/content/site-content";
import {
  availableVariantsQuery,
  mainSiteContentQuery,
  siteContentByVariantQuery,
} from "@/lib/cms/queries";
import { isSanityConfigured, sanityClient } from "@/lib/cms/sanity";

function normalizeSiteContent(input: Partial<SiteContent>): SiteContent {
  return {
    companyName: input.companyName || localSiteContent.companyName,
    company: {
      tagline: input.company?.tagline || localSiteContent.company?.tagline || "",
      email: input.company?.email || localSiteContent.company?.email || "",
      schedulingUrl: input.company?.schedulingUrl || localSiteContent.company?.schedulingUrl,
      timezone: input.company?.timezone || localSiteContent.company?.timezone || "UTC",
      locations: input.company?.locations?.length ? input.company.locations : localSiteContent.company?.locations || [],
      socials: input.company?.socials?.length ? input.company.socials : localSiteContent.company?.socials || [],
    },
    trust: {
      metrics:
        input.trust?.metrics?.length ? input.trust.metrics : localSiteContent.trust?.metrics || [],
      logos:
        input.trust?.logos?.length ? input.trust.logos : localSiteContent.trust?.logos || [],
    },
    hero: {
      badge: input.hero?.badge || localSiteContent.hero.badge,
      title: input.hero?.title || localSiteContent.hero.title,
      subtitle: input.hero?.subtitle || localSiteContent.hero.subtitle,
      primaryCta: input.hero?.primaryCta || localSiteContent.hero.primaryCta,
      secondaryCta: input.hero?.secondaryCta || localSiteContent.hero.secondaryCta,
    },
    services:
      input.services?.filter((service) => service?.slug && service?.title && service?.description) ||
      localSiteContent.services,
    caseStudies:
      input.caseStudies?.filter((study) => study?.client && study?.headline && study?.impact) ||
      localSiteContent.caseStudies,
    testimonials:
      input.testimonials?.filter((t) => t?.quote && t?.name && t?.company) || localSiteContent.testimonials,
    faqs: input.faqs?.filter((f) => f?.q && f?.a) || localSiteContent.faqs,
    differentiators:
      input.differentiators?.filter((d) => d?.title && d?.detail) || localSiteContent.differentiators,
    siteSeo: {
      siteUrl: input.siteSeo?.siteUrl || localSiteContent.siteSeo?.siteUrl,
      defaultTitle: input.siteSeo?.defaultTitle || localSiteContent.siteSeo?.defaultTitle,
      defaultDescription:
        input.siteSeo?.defaultDescription || localSiteContent.siteSeo?.defaultDescription,
    },
    process: input.process?.filter((step) => step?.title && step?.detail) || localSiteContent.process,
    scrollStory: {
      heading: input.scrollStory?.heading || localSiteContent.scrollStory.heading,
      intro: input.scrollStory?.intro || localSiteContent.scrollStory.intro,
      scenes:
        input.scrollStory?.scenes?.length && input.scrollStory.scenes.filter(Boolean).length > 0
          ? input.scrollStory.scenes
          : localSiteContent.scrollStory.scenes,
    },
  };
}

async function fetchSiteContentFromSanity(variant?: string): Promise<Partial<SiteContent> | null> {
  if (!sanityClient) {
    return null;
  }

  if (variant && variant !== "main") {
    return sanityClient.fetch<Partial<SiteContent> | null>(siteContentByVariantQuery, { variant });
  }

  return sanityClient.fetch<Partial<SiteContent> | null>(mainSiteContentQuery);
}

export async function getSiteContent(variant?: string): Promise<SiteContent> {
  if (!isSanityConfigured || !sanityClient) {
    return localSiteContent;
  }

  try {
    const data = await fetchSiteContentFromSanity(variant);
    if (!data) {
      return localSiteContent;
    }

    return normalizeSiteContent(data);
  } catch {
    return localSiteContent;
  }
}

export async function getSiteContentVariant(variant: string): Promise<SiteContent | null> {
  if (!isSanityConfigured || !sanityClient) {
    return null;
  }

  try {
    const data = await fetchSiteContentFromSanity(variant);
    if (!data) {
      return null;
    }

    return normalizeSiteContent(data);
  } catch {
    return null;
  }
}

export async function getAvailableVariants(): Promise<string[]> {
  if (!isSanityConfigured || !sanityClient) {
    return [];
  }

  try {
    const variants = await sanityClient.fetch<string[]>(availableVariantsQuery);
    return [...new Set(variants)].filter((variant) => variant && variant !== "main");
  } catch {
    return [];
  }
}
