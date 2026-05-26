import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { insights } from "@/content/insights";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://staicha.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/services", "/team", "/insights", "/careers", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const serviceUrls = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  const insightUrls = insights.map((i) => ({
    url: `${base}/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...pages, ...serviceUrls, ...insightUrls];
}
