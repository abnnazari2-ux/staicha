import type { Metadata } from "next";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import { JsonLd, breadcrumbsLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "About",
  description:
    "Staicha is a London chartered accountancy and advisory firm where Big Four rigour meets boutique responsiveness. The work behind the work.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Precision is a kindness.",
    body:
      "An accurate number, delivered when it was promised, saves a client time, money, and anxiety. A figure that is nearly right is a problem hiding inside a draft. We hold ourselves to the higher standard because the lower one is unkind to the people who rely on us.",
  },
  {
    title: "Respond like a partner.",
    body:
      "When a client emails, they get a substantive reply within the working day — not a holding response and not an acknowledgement. Our calendars are organised around responsiveness, not protected from it.",
  },
  {
    title: "Plain English, plain numbers.",
    body:
      "Jargon is a charge against the client's time. Every report, every letter, and every email we send is written so that an informed reader, not a specialist, can understand it without translation.",
  },
  {
    title: "Tell people early.",
    body:
      "Bad news travels best when it arrives early. We raise issues — accounting, tax, operational — as soon as we see them. We do not warehouse problems until a meeting, and we do not soften them past the point of clarity.",
  },
  {
    title: "Discreet by default.",
    body:
      "A client's affairs are theirs. We do not name them in marketing without permission. We do not discuss one client with another. We do not exist on social media as a substitute for doing the work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-bone min-h-[80vh] flex items-end pt-s10 pb-s9 relative overflow-hidden" data-theme="dark">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-content mx-auto px-s5 md:px-s7 w-full">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood-tint align-middle mr-s2" />
            About the firm
          </p>
          <AnimatedText
            as="h1"
            className="font-serif font-light leading-[1.04] tracking-display text-[clamp(48px,8vw,120px)] text-bone"
            stagger={0.08}
          >
            {"The work\nbehind the work."}
          </AnimatedText>
        </div>
      </section>

      <section className="bg-bone py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7 grid grid-cols-1 lg:grid-cols-12 gap-s7">
          <div className="lg:col-span-7 space-y-s5 font-serif text-[18px] leading-[1.6] text-ink-2">
            <SectionReveal>
              <p>
                Staicha was founded on a single idea: a firm where the technical standard is identical to a Big Four practice, but the relationship is the calibre of a private adviser. Founders, finance directors, and family-office principals deserve responsiveness measured in hours — not weeks.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p>
                The firm sits in London EC2, a short walk from the Bank of England and the City&rsquo;s principal regulatory and financial institutions. The location is not incidental. It reflects the work — engagements with companies whose figures will be read by boards, auditors, regulators, and counterparties.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <p>
                Every engagement is led by a partner. Every working paper is reviewed by a partner. Every report carries a name. The standard protects the client; it also protects the people who do the work.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal className="lg:col-span-5">
            <blockquote className="font-serif italic text-[clamp(22px,2.4vw,32px)] leading-[1.35] text-ink border-l-2 border-oxblood pl-s5">
              “Read any sentence we put in front of a client out loud. If it could plausibly appear in a private letter from a senior partner at a 100-year-old firm, it passes.”
              <footer className="mt-s5 font-sans not-italic text-[12px] tracking-kicker uppercase text-pewter">
                — Staicha brand guidelines
              </footer>
            </blockquote>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-paper py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7 grid grid-cols-1 md:grid-cols-2 gap-s8">
          <SectionReveal>
            <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s4">Mission</p>
            <p className="font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.4] text-ink">
              To make the numbers behind every ambitious business unimpeachable — so the people running it can move faster, with fewer doubts.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s4">Vision</p>
            <p className="font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.4] text-ink">
              That &lsquo;Staicha numbers&rsquo; becomes shorthand — in boardrooms and acquirer war-rooms across the UK and Europe — for figures you don&rsquo;t need to second-guess.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-bone py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
            Values
          </p>
          <h2 className="font-serif font-light leading-[1.05] tracking-display text-[clamp(36px,5vw,64px)] text-ink mb-s8 max-w-[22ch]">
            Five rules that decide the close cases.
          </h2>

          <ul className="divide-y divide-silver/40 border-y border-silver/40">
            {values.map((v, i) => (
              <li key={v.title}>
                <SectionReveal>
                  <div className="grid grid-cols-12 gap-s5 py-s7">
                    <div className="col-span-2 md:col-span-1 font-mono text-[10px] tracking-mono-up uppercase text-pewter pt-s2">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="col-span-10 md:col-span-4 font-serif text-[clamp(20px,2vw,28px)] leading-[1.25] text-ink">
                      {v.title}
                    </h3>
                    <p className="col-span-12 md:col-span-7 font-sans text-[15px] leading-[1.65] text-graphite">
                      {v.body}
                    </p>
                  </div>
                </SectionReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={breadcrumbsLd([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />
    </>
  );
}
