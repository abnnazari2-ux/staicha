"use client";

import Counter from "@/components/ui/Counter";
import SectionReveal from "@/components/ui/SectionReveal";

const figures = [
  { prefix: "£", to: 2.1, suffix: "bn+", decimals: 1, label: "Aggregate client revenue under advisory" },
  { to: 340, suffix: "+", label: "Active client engagements" },
  { to: 98, suffix: "%", label: "Client retention rate over three years" },
  { to: 14, label: "Average years of partner experience" },
];

export default function NumbersSection() {
  return (
    <section className="bg-ink text-bone py-s10" data-theme="dark">
      <div className="max-w-content mx-auto px-s5 md:px-s7">
        <SectionReveal>
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood-tint align-middle mr-s2" />
            The firm in figures
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s7 mt-s7">
          {figures.map((f, i) => (
            <SectionReveal key={i} delay={i * 0.15}>
              <div className="border-t border-bone/15 pt-s5">
                <div className="font-serif font-light leading-none text-[clamp(56px,7vw,96px)] text-bone">
                  <Counter
                    prefix={f.prefix ?? ""}
                    to={f.to}
                    suffix={f.suffix ?? ""}
                    decimals={f.decimals ?? 0}
                    duration={1800}
                  />
                </div>
                <p className="mt-s5 font-mono text-[10px] tracking-mono-up uppercase text-silver max-w-[26ch]">
                  {f.label}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
