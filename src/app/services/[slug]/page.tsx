import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { services } from "@/content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = services.find((x) => x.slug === params.slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.short,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const next = services[(index + 1) % services.length];

  return (
    <>
      <section className="bg-ink text-bone pt-s10 pb-s9 min-h-[60vh] flex items-end">
        <div className="max-w-content mx-auto px-s5 md:px-s7 w-full">
          <Link href="/services" className="font-mono text-[10px] tracking-mono-up uppercase text-silver hover:text-oxblood-tint mb-s5 inline-block">
            ← All services
          </Link>
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood-tint mb-s4">
            Service {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </p>
          <h1 className="font-serif font-light leading-[1.04] tracking-display text-[clamp(40px,6vw,84px)] text-bone max-w-[24ch]">
            {service.title}
          </h1>
          <p className="mt-s6 font-sans text-[17px] leading-[1.6] text-silver max-w-[64ch]">
            {service.short}
          </p>
        </div>
      </section>

      <section className="bg-bone py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7 grid grid-cols-1 lg:grid-cols-12 gap-s7">
          <div className="lg:col-span-7 space-y-s5 font-serif text-[18px] leading-[1.65] text-ink-2">
            <SectionReveal>
              <p>{service.long}</p>
            </SectionReveal>
          </div>

          <aside className="lg:col-span-5 lg:pl-s7 lg:border-l border-silver/40">
            <SectionReveal>
              <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s4">Who this is for</p>
              <ul className="space-y-s3">
                {service.forWhom.map((w) => (
                  <li key={w} className="flex gap-s3 font-sans text-[14px] leading-[1.55] text-graphite">
                    <span className="mt-[8px] block w-[5px] h-[5px] rounded-full bg-oxblood shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </aside>
        </div>
      </section>

      <section className="bg-paper py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
            What to expect
          </p>
          <h2 className="font-serif font-light leading-[1.05] tracking-display text-[clamp(32px,4vw,56px)] text-ink mb-s8 max-w-[24ch]">
            A defined process from first call to delivery.
          </h2>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s6">
            {service.process.map((p, i) => (
              <li key={p.step}>
                <SectionReveal delay={i * 0.1}>
                  <div className="border-t border-ink/20 pt-s4">
                    <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter mb-s3">
                      Step {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-serif text-[22px] leading-[1.25] text-ink mb-s3">{p.step}</h3>
                    <p className="font-sans text-[14px] leading-[1.6] text-graphite">{p.detail}</p>
                  </div>
                </SectionReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink text-bone py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7 flex flex-col md:flex-row items-start md:items-center justify-between gap-s7">
          <div>
            <h2 className="font-serif font-light text-[clamp(28px,3.5vw,44px)] leading-[1.15] text-bone max-w-[24ch]">
              Begin a conversation about {service.title.toLowerCase()}.
            </h2>
          </div>
          <MagneticButton href="/contact" variant="filled">
            Get in touch
            <span aria-hidden>→</span>
          </MagneticButton>
        </div>
        <div className="max-w-content mx-auto px-s5 md:px-s7 mt-s9 pt-s5 border-t border-bone/10 flex items-center justify-between font-mono text-[10px] tracking-mono-up uppercase text-pewter">
          <span>Next</span>
          <Link href={`/services/${next.slug}`} className="text-oxblood-tint hover:text-bone">
            {next.title} →
          </Link>
        </div>
      </section>
    </>
  );
}
