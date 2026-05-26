import type { Metadata } from "next";
import SectionReveal from "@/components/ui/SectionReveal";
import ContactForm from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with Staicha. London EC2 chartered accountancy and advisory firm. Substantive reply within the working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-bone min-h-[100vh] pt-s10 pb-s10">
      <div className="max-w-content mx-auto px-s5 md:px-s7 grid grid-cols-1 lg:grid-cols-12 gap-s8">
        <SectionReveal className="lg:col-span-7">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
            Begin
          </p>
          <h1 className="font-serif font-light leading-[1.04] tracking-display text-[clamp(48px,7vw,96px)] text-ink mb-s6">
            Get in touch.
          </h1>
          <p className="font-sans text-[16px] leading-[1.65] text-graphite max-w-[52ch] mb-s8">
            Whether it&rsquo;s a new engagement, a question about our services, or a conversation about joining the firm. Every message is read by a partner.
          </p>
          <ContactForm />
        </SectionReveal>

        <SectionReveal className="lg:col-span-5 lg:pl-s7 lg:border-l border-silver/40 space-y-s7" delay={0.15}>
          <div>
            <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s4">Office</p>
            <address className="not-italic font-serif text-[18px] leading-[1.6] text-ink-2">
              14 Throgmorton Avenue<br />London EC2N 2DL<br />United Kingdom
            </address>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s4">Direct</p>
            <p className="font-serif text-[18px] text-ink-2">
              <a href="tel:+442079460118" className="link-underline">+44 20 7946 0118</a>
            </p>
            <p className="font-serif text-[18px] text-ink-2 mt-s2">
              <a href="mailto:contact@staicha.com" className="link-underline">contact@staicha.com</a>
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s4">Office hours</p>
            <p className="font-serif text-[16px] leading-[1.6] text-ink-2">
              Monday – Friday<br />08:30 – 18:00 GMT
            </p>
          </div>
          <div className="aspect-[4/3] bg-ink relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(198,138,120,0.18),transparent_60%)]" />
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-bone/15" />
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-s5">
              <span className="block w-[14px] h-[14px] rounded-full bg-oxblood mb-s4" />
              <p className="font-mono text-[10px] tracking-mono-up uppercase text-silver">
                14 Throgmorton Avenue · London EC2N 2DL
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
