"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { testimonials } from "@/content/testimonials";

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className="bg-bone relative"
      style={{ height: `${testimonials.length * 80}vh` }}
      aria-label="Client testimonials"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-content w-full mx-auto px-s5 md:px-s7 relative">
          <div className="mb-s8">
            <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
              In their words
            </p>
            <h2 className="mt-s3 font-serif font-light leading-[1.05] tracking-display text-[clamp(32px,4.5vw,56px)] text-ink max-w-[20ch]">
              The work, judged by the people who paid for it.
            </h2>
          </div>

          <div className="relative h-[52vh] max-w-3xl">
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={i}
                index={i}
                total={testimonials.length}
                progress={scrollYProgress}
                quote={t.quote}
                name={t.name}
                title={t.title}
                company={t.company}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  index,
  total,
  progress,
  quote,
  name,
  title,
  company,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  quote: string;
  name: string;
  title: string;
  company: string;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  // Card stays in place while its segment is active; slides up + fades as the next one comes in.
  const y = useTransform(progress, [start, end], [0, -120]);
  const opacity = useTransform(progress, [Math.max(0, start - 0.02), start, end - 0.02, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1, 0.96]);

  return (
    <motion.article
      style={{
        y,
        opacity,
        scale,
        zIndex: total - index,
      }}
      className="absolute inset-0 bg-paper border-t-2 border-oxblood p-s7 md:p-s8 shadow-[0_24px_60px_rgba(15,20,23,0.08)] flex flex-col justify-between"
    >
      <span
        aria-hidden
        className="absolute top-s5 left-s6 font-serif text-oxblood text-[80px] leading-none opacity-10 select-none"
      >
        “
      </span>
      <blockquote className="font-serif italic text-[clamp(18px,2.2vw,26px)] leading-[1.4] text-ink max-w-[58ch] mt-s7">
        “{quote}”
      </blockquote>
      <footer className="flex items-end justify-between mt-s6">
        <div>
          <p className="font-sans text-[14px] text-ink">{name}</p>
          <p className="font-sans text-[13px] text-graphite">
            {title}, {company}
          </p>
        </div>
        <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </footer>
    </motion.article>
  );
}
