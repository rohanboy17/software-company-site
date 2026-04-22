import { groq } from "next-sanity";

export const siteContentProjection = `
    companyName,
    company,
    trust,
    hero,
    services[]{
      title,
      "slug": slug.current,
      description,
      outcomes,
      features,
      faqs[]{
        q,
        a
      }
    },
    caseStudies[]{
      client,
      sector,
      headline,
      impact,
      image,
      problem,
      approach,
      timeline,
      stack,
      results[]{
        label,
        value
      }
    },
    testimonials[]{
      quote,
      name,
      role,
      company
    },
    faqs[]{
      q,
      a
    },
    differentiators[]{
      title,
      detail
    },
    siteSeo,
    process[]{
      title,
      detail
    },
    scrollStory
`;

export const mainSiteContentQuery = groq`
  *[_type == "siteContent" && (_id == "site-content-main" || variantKey == "main")][0]{
    ${siteContentProjection}
  }
`;

export const siteContentByVariantQuery = groq`
  *[_type == "siteContent" && variantKey == $variant][0]{
    ${siteContentProjection}
  }
`;

export const availableVariantsQuery = groq`
  *[_type == "siteContent" && defined(variantKey)].variantKey
`;
