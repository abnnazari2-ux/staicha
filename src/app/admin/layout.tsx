import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const sections = [
  { slug: "services", label: "Services" },
  { slug: "team", label: "Team" },
  { slug: "testimonials", label: "Testimonials" },
  { slug: "insights", label: "Insights" },
  { slug: "careers", label: "Careers" },
  { slug: "site", label: "Site Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-bone grid grid-cols-1 md:grid-cols-[260px_1fr] pt-[72px]">
      <aside className="border-r border-bone/10 p-s6 md:sticky md:top-[72px] md:h-[calc(100vh-72px)]">
        <p className="font-mono text-[10px] tracking-mono-up uppercase text-oxblood-tint mb-s4">
          Staicha · Admin
        </p>
        <nav>
          <ul className="space-y-s2">
            {sections.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/admin/${s.slug}`}
                  className="block font-sans text-[14px] text-bone/80 hover:text-oxblood-tint py-s2"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/" className="block mt-s7 font-mono text-[10px] tracking-mono-up uppercase text-silver hover:text-bone">
          ← View site
        </Link>
      </aside>
      <section className="p-s6 md:p-s8">{children}</section>
    </div>
  );
}
