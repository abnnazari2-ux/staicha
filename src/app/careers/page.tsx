import type { Metadata } from "next";
import SectionReveal from "@/components/ui/SectionReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { positions } from "@/content/careers";
import { site } from "@/content/site";
import { JsonLd, breadcrumbsLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open positions at Staicha — a London chartered accountancy and advisory firm. The standard is high. So is the reward.",
  alternates: { canonical: "/careers" },
};

const inPractice = [
  {
    title: "Precision is a kindness.",
    detail:
      "Every working paper is reviewed by a partner. Every report carries a name. The standard protects you as much as the client.",
  },
  {
    title: "Respond like a partner.",
    detail:
      "You will answer client emails within the working day. You will also be answered, by your manager and partner, within the working day.",
  },
  {
    title: "Plain English, plain numbers.",
    detail:
      "If you cannot explain it to a smart non-specialist, it is not yet ready to send. We invest in the writing because the writing is the work.",
  },
  {
    title: "Tell people early.",
    detail:
      "If you see a problem in a file, in a deadline, or in your own workload — say so before it grows. We will help.",
  },
  {
    title: "Discreet by default.",
    detail:
      "Client work is confidential. We do not name clients in marketing without permission, and we do not perform on social media.",
  },
];

const whyBenefits = [
  { title: "ACA / CTA study support", detail: "Full study costs, paid study leave, and a partner mentor who has sat the same exams." },
  { title: "Partner mentorship", detail: "Direct working relationships with partners with fifteen-plus years at top firms." },
  { title: "London EC2 office", detail: "A real office, in a real building, walkable to the City and Liverpool Street." },
  { title: "Meaningful work, early", detail: "Discrete ownership from your first month. No multi-year apprenticeships to substantive work." },
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-ink text-bone pt-s10 pb-s9 min-h-[65vh] flex items-end" data-theme="dark">
        <div className="max-w-content mx-auto px-s5 md:px-s7 w-full">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood-tint align-middle mr-s2" />
            Careers at Staicha
          </p>
          <h1 className="font-serif font-light leading-[1.04] tracking-display text-[clamp(48px,8vw,108px)] text-bone max-w-[18ch]">
            The standard is high. So is the reward.
          </h1>
          <p className="mt-s6 font-sans text-[16px] leading-[1.65] text-silver max-w-[58ch]">
            We hire ambitious people who want to do partner-quality work from the beginning of their careers, in an environment where review is rigorous, mentorship is direct, and the client outcomes are visible.
          </p>
        </div>
      </section>

      <section className="bg-bone py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
            Values in practice
          </p>
          <h2 className="font-serif font-light leading-[1.05] tracking-display text-[clamp(32px,4.5vw,56px)] text-ink mb-s8 max-w-[26ch]">
            What the firm&rsquo;s values look like inside the building.
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-s7">
            {inPractice.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.08}>
                <div className="border-t border-ink/20 pt-s4">
                  <h3 className="font-serif text-[22px] leading-[1.25] text-ink mb-s3">{v.title}</h3>
                  <p className="font-sans text-[14px] leading-[1.6] text-graphite">{v.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
            Open positions
          </p>
          <h2 className="font-serif font-light leading-[1.05] tracking-display text-[clamp(32px,4.5vw,56px)] text-ink mb-s8">
            Hiring now.
          </h2>

          <ul className="divide-y divide-silver/40 border-y border-silver/40">
            {positions.map((p) => (
              <li key={p.slug}>
                <SectionReveal>
                  <details className="group py-s6">
                    <summary className="grid grid-cols-12 gap-s5 cursor-pointer list-none items-baseline">
                      <h3 className="col-span-12 md:col-span-5 font-serif text-[clamp(20px,2.2vw,28px)] leading-[1.2] text-ink group-open:text-oxblood">
                        {p.title}
                      </h3>
                      <p className="col-span-6 md:col-span-3 font-sans text-[13px] text-graphite">{p.department}</p>
                      <p className="col-span-6 md:col-span-3 font-mono text-[10px] tracking-mono-up uppercase text-pewter">
                        {p.location} · {p.type}
                      </p>
                      <span className="hidden md:block col-span-1 text-right text-oxblood text-[18px] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-s5 mt-s6 pt-s5 border-t border-silver/40">
                      <div className="md:col-span-7">
                        <p className="font-serif text-[17px] leading-[1.6] text-ink-2 mb-s5">{p.summary}</p>
                        <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s3">Responsibilities</p>
                        <ul className="space-y-s2 mb-s5">
                          {p.responsibilities.map((r) => (
                            <li key={r} className="flex gap-s3 font-sans text-[14px] leading-[1.55] text-graphite">
                              <span className="mt-[8px] block w-[5px] h-[5px] rounded-full bg-oxblood shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:col-span-5">
                        <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s3">Requirements</p>
                        <ul className="space-y-s2 mb-s6">
                          {p.requirements.map((r) => (
                            <li key={r} className="flex gap-s3 font-sans text-[14px] leading-[1.55] text-graphite">
                              <span className="mt-[8px] block w-[5px] h-[5px] rounded-full bg-ink shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={`mailto:${site.contact.email}?subject=Application — ${encodeURIComponent(p.title)}`}
                          className="inline-flex items-center gap-s3 px-s5 py-s3 bg-oxblood text-bone font-sans text-[12px] tracking-kicker uppercase hover:bg-oxblood-tint transition-colors"
                        >
                          Apply via email →
                        </a>
                      </div>
                    </div>
                  </details>
                </SectionReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink text-bone py-s10" data-theme="dark">
        <div className="max-w-content mx-auto px-s5 md:px-s7">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood-tint align-middle mr-s2" />
            Why Staicha
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s6">
            {whyBenefits.map((b, i) => (
              <SectionReveal key={b.title} delay={i * 0.08}>
                <div className="border-t border-bone/15 pt-s4">
                  <h3 className="font-serif text-[20px] leading-[1.25] text-bone mb-s3">{b.title}</h3>
                  <p className="font-sans text-[14px] leading-[1.6] text-silver">{b.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <div className="mt-s9">
            <MagneticButton href={`mailto:${site.contact.email}?subject=Career enquiry`} variant="filled">
              Speak with the firm
              <span aria-hidden>→</span>
            </MagneticButton>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbsLd([
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
        ])}
      />
    </>
  );
}
