# Software Company Site

Premium software company website built with Next.js, featuring:
- cinematic homepage
- service detail pages
- scroll-driven 3D storytelling
- CMS-ready dynamic content architecture

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` → `.env.local`.

### Sanity (optional)
If configured, the site fetches content from Sanity. If not configured, it falls back to `src/content/site-content.ts`.

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
```

### Contact form (Resend)
To enable `/contact` → `/api/contact` email delivery:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

## CMS Integration (Sanity)

The app now uses a CMS adapter:
- when Sanity environment variables exist, content is fetched from Sanity.
- when not configured, the site falls back to local content in `src/content/site-content.ts`.

Create `.env.local` from `.env.example` and set:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
```

Main CMS integration files:
- `src/lib/cms/sanity.ts`
- `src/lib/cms/queries.ts`
- `src/lib/cms/get-site-content.ts`
- `src/app/studio/[[...tool]]/page.tsx`
- `sanity.config.ts`
- `sanity.cli.ts`
- `sanity/schemaTypes/index.ts`

Open embedded Studio at:
- `http://localhost:3000/studio`

Optional standalone Studio tooling commands:

```bash
npm run sanity:dev
npm run sanity:deploy
```

Homepage variant route:
- `http://localhost:3000/home/variant-b`

Seed files:
- `sanity/seed/siteContent.seed.json` (main)
- `sanity/seed/siteContent.variant-b.seed.json` (variant-b)

## Build Check

```bash
npm run lint
npm run build
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel: **New Project** → import the GitHub repo.
3. Add env vars you need (Sanity optional; Resend required for contact email).
4. Deploy.
