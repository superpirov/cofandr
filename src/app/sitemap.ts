import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { legalDocuments } from "@/config/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...legalDocuments.map((doc) => ({
      url: `${site.url}/legal/${doc.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
