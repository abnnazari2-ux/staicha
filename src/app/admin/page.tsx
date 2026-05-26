import Link from "next/link";
import { services } from "@/content/services";
import { team } from "@/content/team";
import { testimonials } from "@/content/testimonials";
import { insights } from "@/content/insights";
import { positions } from "@/content/careers";

const stats = [
  { label: "Services", count: services.length, href: "/admin/services" },
  { label: "Team members", count: team.length, href: "/admin/team" },
  { label: "Testimonials", count: testimonials.length, href: "/admin/testimonials" },
  { label: "Insights", count: insights.length, href: "/admin/insights" },
  { label: "Open positions", count: positions.length, href: "/admin/careers" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-serif font-light text-[clamp(32px,4vw,56px)] leading-[1.1] mb-s5">
        Dashboard.
      </h1>
      <p className="font-sans text-[15px] text-silver max-w-[60ch] mb-s8">
        Content is stored in the repository under <code className="font-mono text-[12px] text-oxblood-tint">/src/content</code>.
        Edit the TypeScript files directly or extend this admin with write endpoints. Changes appear on the live site after a redeploy.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-s5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="block border border-bone/15 p-s6 hover:border-oxblood-tint transition-colors"
          >
            <p className="font-mono text-[10px] tracking-mono-up uppercase text-silver mb-s3">{s.label}</p>
            <p className="font-serif font-light text-[56px] leading-none tabular">{s.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
