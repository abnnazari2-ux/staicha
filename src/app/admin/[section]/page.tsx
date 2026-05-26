import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { team } from "@/content/team";
import { testimonials } from "@/content/testimonials";
import { insights } from "@/content/insights";
import { positions } from "@/content/careers";
import CollectionEditor from "./CollectionEditor";

const MAP = {
  services: { title: "Services", data: services, file: "/src/content/services.ts" },
  team: { title: "Team", data: team, file: "/src/content/team.ts" },
  testimonials: { title: "Testimonials", data: testimonials, file: "/src/content/testimonials.ts" },
  insights: { title: "Insights", data: insights, file: "/src/content/insights.ts" },
  careers: { title: "Careers", data: positions, file: "/src/content/careers.ts" },
  site: { title: "Site Settings", data: null, file: "/src/content/site.ts" },
} as const;

export default function SectionPage({ params }: { params: { section: string } }) {
  if (!(params.section in MAP)) notFound();
  const key = params.section as keyof typeof MAP;
  const entry = MAP[key];

  if (key === "site") {
    return (
      <div>
        <h1 className="font-serif font-light text-[clamp(32px,4vw,56px)] leading-[1.1] mb-s4">Site Settings.</h1>
        <p className="font-mono text-[10px] tracking-mono-up uppercase text-silver mb-s7">Source · {entry.file}</p>
        <p className="font-sans text-[14px] text-silver max-w-[60ch]">
          Site-wide settings (firm name, contact details, address, hours) are edited directly in <code className="font-mono text-[12px] text-oxblood-tint">src/content/site.ts</code>. After editing, commit and redeploy.
        </p>
      </div>
    );
  }

  return (
    <CollectionEditor
      collection={key}
      title={entry.title}
      file={entry.file}
      initialData={entry.data as unknown[]}
    />
  );
}
