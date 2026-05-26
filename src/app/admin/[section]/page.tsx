import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/content/services";
import { team } from "@/content/team";
import { testimonials } from "@/content/testimonials";
import { insights } from "@/content/insights";
import { positions } from "@/content/careers";

type Row = { primary: string; secondary?: string; meta?: string; href?: string };

function rowsFor(section: string): { title: string; rows: Row[]; file: string } | null {
  switch (section) {
    case "services":
      return {
        title: "Services",
        file: "/src/content/services.ts",
        rows: services.map((s) => ({ primary: s.title, secondary: s.short, meta: s.slug, href: `/services/${s.slug}` })),
      };
    case "team":
      return {
        title: "Team",
        file: "/src/content/team.ts",
        rows: team.map((m) => ({ primary: m.name, secondary: m.title, meta: m.email, href: "/team" })),
      };
    case "testimonials":
      return {
        title: "Testimonials",
        file: "/src/content/testimonials.ts",
        rows: testimonials.map((t) => ({ primary: `${t.name}, ${t.title}`, secondary: t.quote.slice(0, 120) + "…", meta: t.company })),
      };
    case "insights":
      return {
        title: "Insights",
        file: "/src/content/insights.ts",
        rows: insights.map((p) => ({ primary: p.title, secondary: p.excerpt, meta: `${p.category} · ${p.date}`, href: `/insights/${p.slug}` })),
      };
    case "careers":
      return {
        title: "Careers",
        file: "/src/content/careers.ts",
        rows: positions.map((p) => ({ primary: p.title, secondary: p.summary, meta: `${p.department} · ${p.location}` })),
      };
    case "site":
      return {
        title: "Site Settings",
        file: "/src/app/layout.tsx",
        rows: [
          { primary: "Site URL", secondary: process.env.NEXT_PUBLIC_SITE_URL || "https://staicha.co.uk" },
          { primary: "Contact email", secondary: "contact@staicha.com" },
          { primary: "Office phone", secondary: "+44 20 7946 0118" },
          { primary: "Office address", secondary: "14 Throgmorton Avenue, London EC2N 2DL" },
        ],
      };
    default:
      return null;
  }
}

export default function SectionPage({ params }: { params: { section: string } }) {
  const data = rowsFor(params.section);
  if (!data) notFound();

  return (
    <div>
      <h1 className="font-serif font-light text-[clamp(32px,4vw,56px)] leading-[1.1] mb-s4">
        {data.title}.
      </h1>
      <p className="font-mono text-[10px] tracking-mono-up uppercase text-silver mb-s7">
        Source · {data.file}
      </p>

      <ul className="divide-y divide-bone/10 border-y border-bone/10">
        {data.rows.map((r, i) => (
          <li key={i} className="grid grid-cols-12 gap-s5 py-s5 items-start">
            <span className="col-span-1 font-mono text-[10px] tracking-mono-up uppercase text-silver pt-s2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="col-span-8">
              <p className="font-serif text-[18px] leading-[1.3] text-bone">{r.primary}</p>
              {r.secondary && <p className="mt-s2 font-sans text-[13px] leading-[1.55] text-silver">{r.secondary}</p>}
            </div>
            <div className="col-span-3 text-right">
              {r.meta && <p className="font-mono text-[10px] tracking-mono-up uppercase text-silver">{r.meta}</p>}
              {r.href && (
                <Link href={r.href} className="block mt-s2 font-mono text-[10px] tracking-mono-up uppercase text-oxblood-tint hover:text-bone">
                  View →
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
