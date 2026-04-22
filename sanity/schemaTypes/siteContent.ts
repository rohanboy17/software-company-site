const siteContentSchema = {
  name: "siteContent",
  title: "Site Content",
  type: "document",
  fields: [
    {
      name: "variantKey",
      title: "Variant Key",
      type: "string",
      description: "Use values like main, variant-b, variant-c to power /home/[variant] routes.",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    { name: "companyName", title: "Company Name", type: "string" },
    {
      name: "company",
      title: "Company",
      type: "object",
      fields: [
        { name: "tagline", title: "Tagline", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "schedulingUrl", title: "Scheduling URL", type: "url" },
        { name: "timezone", title: "Timezone", type: "string" },
        { name: "locations", title: "Locations", type: "array", of: [{ type: "string" }] },
        {
          name: "socials",
          title: "Social Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "url", title: "URL", type: "url" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "trust",
      title: "Trust",
      type: "object",
      fields: [
        {
          name: "metrics",
          title: "Metrics",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "value", title: "Value", type: "string" },
              ],
            },
          ],
        },
        {
          name: "logos",
          title: "Logo Names",
          description: "Small text-based placeholders (or add real logos later).",
          type: "array",
          of: [
            {
              type: "object",
              fields: [{ name: "name", title: "Name", type: "string" }],
            },
          ],
        },
      ],
    },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "badge", title: "Badge", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text" },
        { name: "primaryCta", title: "Primary CTA", type: "string" },
        { name: "secondaryCta", title: "Secondary CTA", type: "string" },
      ],
    },
    {
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
            { name: "description", title: "Description", type: "text" },
            { name: "outcomes", title: "Outcomes", type: "array", of: [{ type: "string" }] },
            { name: "features", title: "Features", type: "array", of: [{ type: "string" }] },
            {
              name: "faqs",
              title: "FAQs",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "q", title: "Question", type: "string" },
                    { name: "a", title: "Answer", type: "text" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "caseStudies",
      title: "Case Studies",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "client", title: "Client", type: "string" },
            { name: "sector", title: "Sector", type: "string" },
            { name: "headline", title: "Headline", type: "text" },
            { name: "impact", title: "Impact", type: "string" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "problem", title: "Problem", type: "text" },
            { name: "approach", title: "Approach", type: "text" },
            { name: "timeline", title: "Timeline", type: "string" },
            { name: "stack", title: "Stack", type: "array", of: [{ type: "string" }] },
            {
              name: "results",
              title: "Results",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", title: "Label", type: "string" },
                    { name: "value", title: "Value", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text" },
            { name: "name", title: "Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "company", title: "Company", type: "string" },
          ],
        },
      ],
    },
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", title: "Question", type: "string" },
            { name: "a", title: "Answer", type: "text" },
          ],
        },
      ],
    },
    {
      name: "differentiators",
      title: "Differentiators",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "detail", title: "Detail", type: "text" },
          ],
        },
      ],
    },
    {
      name: "siteSeo",
      title: "Site SEO",
      type: "object",
      fields: [
        { name: "siteUrl", title: "Site URL", type: "url" },
        { name: "defaultTitle", title: "Default Title", type: "string" },
        { name: "defaultDescription", title: "Default Description", type: "text" },
      ],
    },
    {
      name: "process",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "detail", title: "Detail", type: "text" },
          ],
        },
      ],
    },
    {
      name: "scrollStory",
      title: "Scroll Story",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "intro", title: "Intro", type: "text" },
        { name: "scenes", title: "Scenes", type: "array", of: [{ type: "string" }] },
      ],
    },
  ],
};

export default siteContentSchema;
