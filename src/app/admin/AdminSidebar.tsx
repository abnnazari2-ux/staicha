"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { slug: "services", label: "Services" },
  { slug: "team", label: "Team" },
  { slug: "testimonials", label: "Testimonials" },
  { slug: "insights", label: "Insights" },
  { slug: "careers", label: "Careers" },
  { slug: "site", label: "Site Settings" },
] as const;

export default function AdminSidebar() {
  const pathname = usePathname() ?? "/admin";
  return (
    <aside className="border-r border-bone/10 p-s6 md:sticky md:top-[72px] md:h-[calc(100vh-72px)]">
      <p className="font-mono text-[10px] tracking-mono-up uppercase text-oxblood-tint mb-s4">
        Staicha · Admin
      </p>
      <nav aria-label="Admin sections">
        <ul className="space-y-s2">
          <li>
            <Link
              href="/admin"
              aria-current={pathname === "/admin" ? "page" : undefined}
              className={[
                "flex items-center gap-s2 font-sans text-[14px] py-s2 transition-colors",
                pathname === "/admin" ? "text-oxblood-tint" : "text-bone/80 hover:text-oxblood-tint",
              ].join(" ")}
            >
              {pathname === "/admin" && (
                <span aria-hidden className="inline-block w-[5px] h-[5px] rounded-full bg-oxblood-tint" />
              )}
              <span>Dashboard</span>
            </Link>
          </li>
          {sections.map((s) => {
            const href = `/admin/${s.slug}`;
            const active = pathname === href;
            return (
              <li key={s.slug}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center gap-s2 font-sans text-[14px] py-s2 transition-colors",
                    active ? "text-oxblood-tint" : "text-bone/80 hover:text-oxblood-tint",
                  ].join(" ")}
                >
                  {active && (
                    <span aria-hidden className="inline-block w-[5px] h-[5px] rounded-full bg-oxblood-tint" />
                  )}
                  <span>{s.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Link
        href="/"
        className="block mt-s7 font-mono text-[10px] tracking-mono-up uppercase text-silver hover:text-bone"
      >
        ← View site
      </Link>
    </aside>
  );
}
