"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import type { Testimonial } from "@/content/testimonials";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile || reduce) return <MobileCarousel testimonials={testimonials} />;
  return <DesktopStack testimonials={testimonials} />;
}

function Header() {
  return (
    <div className="mb-s8">
      <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood">
        <span aria-hidden className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
        In their words
      </p>
      <h2 className="mt-s3 font-serif font-light leading-[1.05] tracking-display text-[clamp(32px,4.5vw,56px)] text-ink max-w-[20ch]">
        The work, judged by the people who paid for it.
      </h2>
    </div>
  );
}

function MobileCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.children[i] as HTMLElement | undefined;
    if (!card) return;
    // Measure actual horizontal padding rather than hard-coding an offset.
    const padding = parseFloat(getComputedStyle(t).paddingLeft) || 0;
    t.scrollTo({ left: card.offsetLeft - padding, behavior: "smooth" });
  };

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = t.scrollLeft + t.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(t.children).forEach((c, i) => {
          const el = c as HTMLElement;
          const mid = el.offsetLeft + el.offsetWidth / 2;
          const d = Math.abs(mid - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      t.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-bone py-s9" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="max-w-content mx-auto px-s5">
        <Header />
        <div
          ref={trackRef}
          className="flex gap-s5 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-s5 px-s5 pb-s5"
        >
          {testimonials.map((t, i) => (
            <article
              key={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
              className="snap-center shrink-0 w-[88vw] bg-paper border-t-2 border-oxblood p-s6 shadow-[0_24px_60px_rgba(15,20,23,0.06)]"
            >
              <span aria-hidden className="block font-serif text-oxblood text-[64px] leading-none opacity-10 select-none -mb-s4">
                “
              </span>
              <blockquote className="font-serif italic text-[18px] leading-[1.5] text-ink">
                “{t.quote}”
              </blockquote>
              <footer className="mt-s5 pt-s4 border-t border-silver/40">
                <p className="font-sans text-[14px] text-ink">{t.name}</p>
                <p className="font-sans text-[13px] text-graphite">
                  {t.title}, {t.company}
                </p>
              </footer>
            </article>
          ))}
        </div>
        {/* Pagination — wraps a 6px visible dot inside a 32×32 touch target. */}
        <div className="flex justify-center gap-s1 mt-s5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              aria-pressed={i === active}
              onClick={() => scrollTo(i)}
              className="w-[32px] h-[32px] inline-flex items-center justify-center group"
            >
              <span
                aria-hidden
                className={[
                  "block h-[6px] rounded-full transition-all",
                  i === active ? "w-[28px] bg-oxblood" : "w-[8px] bg-silver group-hover:bg-graphite",
                ].join(" ")}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopStack({ testimonials }: { testimonials: Testimonial[] }) {
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
          <Header />
          <div className="relative min-h-[44vh] max-w-3xl">
            {testimonials.map((t, i) => (
              <Card key={i} index={i} total={testimonials.length} progress={scrollYProgress} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
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
  const y = useTransform(progress, [start, end], [0, -100]);
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.02), start, end - 0.02, end],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [start, end], [1, 0.96]);

  return (
    <motion.article
      style={{ y, opacity, scale, zIndex: total - index }}
      className="absolute inset-x-0 bg-paper border-t-2 border-oxblood p-s7 md:p-s8 shadow-[0_24px_60px_rgba(15,20,23,0.08)]"
    >
      <span
        aria-hidden
        className="absolute top-s5 left-s6 font-serif text-oxblood text-[80px] leading-none opacity-10 select-none"
      >
        “
      </span>
      <blockquote className="font-serif italic text-[clamp(18px,2.2vw,26px)] leading-[1.45] text-ink max-w-[58ch] mt-s5">
        “{quote}”
      </blockquote>
      <footer className="flex items-end justify-between mt-s6 pt-s5 border-t border-silver/40">
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
