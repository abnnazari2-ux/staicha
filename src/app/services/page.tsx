import type { Metadata } from "next";
import Link from "next/link";
import SectionReveal from "@/components/ui/SectionReveal";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Audit, tax, corporate finance, fractional CFO, R&D, VAT, and advisory services from Staicha — a London chartered accountancy firm.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink text-bone pt-s10 pb-s9 min-h-[60vh] flex items-end">
        <div className="max-w-content mx-auto px-s5 md:px-s7 w-full">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood-tint align-middle mr-s2" />
            Capabilities
          </p>
          <h1 className="font-serif font-light leading-[1.04] tracking-display text-[clamp(48px,8vw,120px)] text-bone max-w-[18ch]">
            Twelve services. One standard.
          </h1>
          <p className="mt-s6 font-sans text-[16px] leading-[1.6] text-silver max-w-[58ch]">
            The full range of work expected of a chartered accountancy and advisory firm, delivered to the standard the largest firms reserve for their most senior clients.
          </p>
        </div>
      </section>

      <section className="bg-bone">
        <ul className="max-w-content mx-auto px-s5 md:px-s7 divide-y divide-silver/40">
          {services.map((s, i) => (
            <li key={s.slug}>
              <SectionReveal>
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid grid-cols-12 gap-s5 py-s7 items-baseline hover:bg-bone-2 transition-colors -mx-s5 px-s5"
                >
                  <span className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-mono-up uppercase text-pewter">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="col-span-10 md:col-span-5 font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.2] text-ink group-hover:text-oxblood transition-colors">
                    {s.title}
                  </h2>
                  <p className="col-span-12 md:col-span-5 font-sans text-[15px] leading-[1.65] text-graphite">
                    {s.short}
                  </p>
                  <span className="hidden md:block col-span-1 text-right text-oxblood font-sans text-[18px] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </SectionReveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
