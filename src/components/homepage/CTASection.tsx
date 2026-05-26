import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionReveal from "@/components/ui/SectionReveal";
import { site } from "@/content/site";

export default function CTASection() {
  return (
    <section className="bg-ink text-bone py-s10 relative overflow-hidden" data-theme="dark">
      <div className="max-w-content mx-auto px-s5 md:px-s7">
        <SectionReveal>
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood-tint align-middle mr-s2" />
            Begin
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="font-serif font-light leading-[1.04] tracking-display text-[clamp(40px,6vw,80px)] text-bone max-w-[18ch]">
            The conversation starts here.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-s7 mt-s8 max-w-4xl">
          <SectionReveal delay={0.2}>
            <p className="font-sans text-[16px] leading-[1.6] text-silver max-w-[42ch]">
              Whether you need an audit opinion that holds up to scrutiny, a tax position you can rely on, or a financial partner who responds like one — we should talk.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <address className="not-italic font-sans text-[15px] text-bone space-y-s2">
              <p><a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a></p>
              <p><a href={site.contact.phoneHref} className="link-underline">{site.contact.phone}</a></p>
              <p className="text-silver">{site.address.street}<br />{site.address.locality} {site.address.postcode}</p>
            </address>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.45}>
          <div className="mt-s9">
            <MagneticButton href="/contact" variant="filled">
              Get in touch
              <span aria-hidden>→</span>
            </MagneticButton>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.6}>
          <div className="mt-s10 flex flex-col items-center gap-s4 pt-s9 border-t border-bone/10">
            <Image
              src="/logos/svg/horizontal-descriptor-reversed.svg"
              alt="Staicha — Chartered Accountants · Advisors · London"
              width={480}
              height={96}
              className="h-14 w-auto"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
