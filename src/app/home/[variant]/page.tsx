import { notFound } from "next/navigation";
import Homepage from "@/components/homepage";
import { getAvailableVariants, getSiteContentVariant } from "@/lib/cms/get-site-content";
import { getFrameCount } from "@/lib/frames/get-frame-files";

type VariantPageProps = {
  params: Promise<{ variant: string }>;
};

export async function generateStaticParams() {
  const variants = await getAvailableVariants();
  return variants.map((variant) => ({ variant }));
}

export default async function HomeVariantPage({ params }: VariantPageProps) {
  const { variant } = await params;

  if (!variant || variant === "main") {
    notFound();
  }

  const [content, frameCount] = await Promise.all([getSiteContentVariant(variant), getFrameCount()]);
  if (!content) {
    notFound();
  }

  return <Homepage content={content} activeVariant={variant} frameCount={frameCount} />;
}
