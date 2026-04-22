import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { getSiteContent } from "@/lib/cms/get-site-content";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Analytics from "@/components/site/Analytics";
import DevVitals from "@/components/site/DevVitals";

// Client-only islands handle cursor/3D to prevent hydration mismatch
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const defaultTitle = content.siteSeo?.defaultTitle || `${content.companyName} | Software Company`;
  const defaultDescription =
    content.siteSeo?.defaultDescription ||
    "High-performance websites, apps, software platforms, and AI systems engineered for modern teams.";

  const metadataBase = content.siteSeo?.siteUrl ? new URL(content.siteSeo.siteUrl) : undefined;

  return {
    metadataBase,
    title: {
      default: defaultTitle,
      template: `%s | ${content.companyName}`,
    },
    description: defaultDescription,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.companyName,
    url: content.siteSeo?.siteUrl,
    email: content.company?.email,
    sameAs: content.company?.socials?.map((s) => s.url),
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ position: "relative" }}
    >
      <body className="relative min-h-full flex flex-col">
        <SmoothScrollProvider>
          <div className="pointer-events-none fixed inset-0 z-0 grain" />
          <div className="relative z-10 flex min-h-full flex-col">
            <SiteHeader content={content} />
            <div id="content" className="flex-1">
              {children}
            </div>
            <SiteFooter content={content} />
          </div>
          <Analytics />
          <DevVitals />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
