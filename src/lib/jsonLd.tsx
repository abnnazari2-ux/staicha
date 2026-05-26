import { site } from "@/content/site";
import type { Service } from "@/content/services";
import type { TeamMember } from "@/content/team";
import type { Insight } from "@/content/insights";

const base = site.url;

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: site.legalName,
  alternateName: site.name,
  url: base,
  logo: `${base}/logos/png/wordmark-primary.png`,
  image: `${base}/og-image.png`,
  email: site.contact.email,
  telephone: site.contact.phone,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postcode,
    addressCountry: site.address.countryCode,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  priceRange: "£££",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "18:00",
    },
  ],
  sameAs: site.social.map((s) => s.url),
};

export function serviceLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.title,
    name: s.title,
    description: s.short,
    provider: { "@type": "AccountingService", name: site.legalName, url: base },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    url: `${base}/services/${s.slug}`,
  };
}

export function personLd(m: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    honorificSuffix: m.qualifications,
    jobTitle: m.title,
    email: m.email,
    image: m.image,
    worksFor: { "@type": "Organization", name: site.legalName, url: base },
    description: m.bio,
    url: `${base}/team`,
  };
}

export function articleLd(p: Insight) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    dateModified: p.date,
    author: { "@type": "Person", name: p.author },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: { "@type": "ImageObject", url: `${base}/logos/png/wordmark-primary.png` },
    },
    image: p.image,
    articleSection: p.category,
    mainEntityOfPage: `${base}/insights/${p.slug}`,
  };
}

export function breadcrumbsLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.url}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
