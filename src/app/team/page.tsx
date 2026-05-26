import type { Metadata } from "next";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import { readCollection } from "@/lib/cms";
import { JsonLd, personLd, breadcrumbsLd } from "@/lib/jsonLd";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Team",
  description: "The partners and senior practitioners at Staicha — chartered accountants and advisors based in London EC2.",
  alternates: { canonical: "/team" },
};

export default async function TeamPage() {
  const team = await readCollection("team");
  return (
    <>
      <section className="bg-ink text-bone pt-s10 pb-s9 min-h-[60vh] flex items-end" data-theme="dark">
        <div className="max-w-content mx-auto px-s5 md:px-s7 w-full">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood-tint align-middle mr-s2" />
            The partners
          </p>
          <h1 className="font-serif font-light leading-[1.04] tracking-display text-[clamp(48px,8vw,120px)] text-bone max-w-[20ch]">
            Names against the work.
          </h1>
          <p className="mt-s6 font-sans text-[16px] leading-[1.65] text-silver max-w-[58ch]">
            Every engagement at Staicha is led by a partner. The same individual you meet on the first call is the individual whose name will appear on the report.
          </p>
        </div>
      </section>

      <section className="bg-bone py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7 grid grid-cols-1 md:grid-cols-3 gap-s7">
          {team.map((m, i) => (
            <SectionReveal key={m.slug} delay={i * 0.12}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-bone-2 mb-s5">
                  <Image
                    src={m.image}
                    alt={`Portrait of ${m.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-bone opacity-[0.06] group-hover:opacity-0 transition-opacity duration-500" />
                </div>
                <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter mb-s3">
                  {m.qualifications}
                </p>
                <h2 className="font-serif text-[clamp(22px,2.2vw,28px)] leading-[1.2] text-ink mb-s2">
                  {m.name}
                </h2>
                <p className="font-sans text-[14px] text-oxblood mb-s4">{m.title}</p>
                <p className="font-serif text-[16px] leading-[1.65] text-ink-2 mb-s5">{m.bio}</p>
                <a href={`mailto:${m.email}`} className="link-underline font-mono text-[12px] tracking-[0.04em] text-ink">
                  {m.email}
                </a>
              </article>
            </SectionReveal>
          ))}
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbsLd([
            { name: "Home", url: "/" },
            { name: "Team", url: "/team" },
          ]),
          ...team.map((m) => personLd(m)),
        ]}
      />
    </>
  );
}
