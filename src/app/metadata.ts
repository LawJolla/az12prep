import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "AZ-12",
    "Azure",
    "Microsoft Azure",
    "Certification",
    "Exam Prep",
    "Practice Tests",
    "Study Guide",
    "Cloud Computing",
    "Azure Fundamentals",
    "Microsoft Certification",
    "Azure Training",
    "IT Certification",
  ],
  authors: [
    {
      name: "Dillion Verma",
      url: "https://magicui.design",
    },
  ],
  creator: "dillionverma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@dillionverma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
