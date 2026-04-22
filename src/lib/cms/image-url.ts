import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const builder =
  projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export function getSanityImageUrl(
  source: unknown,
  opts: { width: number; height: number },
): string | null {
  if (!builder || !source) return null;
  return builder.image(source as SanityImageSource).width(opts.width).height(opts.height).url();
}

