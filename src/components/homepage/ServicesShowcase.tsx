"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { services } from "@/content/services";

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();

  // Measure how far the track must travel so the last card aligns with the
  // viewport's left edge. Updates on resize.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      setIsMobile(mobile);
      if (mobile || !trackRef.current || !sectionRef.current) {
        setTravel(0);
        return;
      }
      const track = trackRef.current.scrollWidth;
      const viewport = window.innerWidth;
      setTravel(Math.max(0, track - viewport));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Use horizontal scroll on md+, vertical stack on mobile.
  const horizontal = !isMobile && !reduce && travel > 0;

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper"
      style={{ height: horizontal ? `${services.length * 70}vh` : "auto" }}
      aria-label="Services"
    >
      <div className={horizontal ? "sticky top-0 h-screen overflow-hidden flex flex-col" : "flex flex-col py-s9"}>
        <div className="px-s5 md:px-s7 pt-s9 pb-s5 max-w-content w-full mx-auto">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s3">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
            Services
          </p>
          <h2 className="font-serif font-light leading-[1.05] tracking-display text-[clamp(40px,5.5vw,72px)] text-ink">
            What we do.
          </h2>
        </div>

        <div className={horizontal ? "flex-1 flex items-center overflow-hidden" : "px-s5 md:px-s7"}>
          <motion.ul
            ref={trackRef}
            style={horizontal ? { x } : undefined}
            className={
              horizontal
                ? "flex gap-s6 px-s5 md:px-s7 will-change-transform"
                : "grid grid-cols-1 gap-s5 max-w-content mx-auto w-full"
            }
          >
            {services.map((s, i) => {
              const dark = i % 2 === 1;
              return (
                <li
                  key={s.slug}
                  className={[
                    horizontal
                      ? "shrink-0 w-[80vw] md:w-[55vw] lg:w-[48vw] h-[58vh] p-s7 md:p-s8 flex flex-col justify-between"
                      : "p-s6 md:p-s7 flex flex-col gap-s5",
                    "transition-colors",
                    dark ? "bg-ink text-bone" : "bg-bone text-ink",
                  ].join(" ")}
                  {...(dark ? { "data-theme": "dark" } : {})}
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-mono text-[10px] tracking-mono-up uppercase ${dark ? "text-silver" : "text-pewter"}`}>
                      {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>
                    <ServiceIcon dark={dark} index={i} />
                  </div>
                  <div>
                    <h3 className="font-serif font-light leading-[1.15] text-[clamp(22px,2.5vw,34px)] mb-s4">
                      {s.title}
                    </h3>
                    <p className={`font-sans text-[15px] leading-[1.55] max-w-[42ch] ${dark ? "text-silver" : "text-graphite"}`}>
                      {s.short}
                    </p>
                    <Link
                      href={`/services/${s.slug}`}
                      className={`group inline-flex items-center gap-s3 mt-s6 font-sans text-[13px] tracking-kicker uppercase link-underline ${dark ? "text-oxblood-tint" : "text-oxblood"}`}
                    >
                      Read more
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </motion.ul>
        </div>

        {horizontal && (
          <div className="px-s5 md:px-s7 pb-s7 max-w-content w-full mx-auto">
            <div className="h-px bg-silver/40 relative overflow-hidden" aria-hidden>
              <motion.div style={{ width: progress }} className="absolute inset-y-0 left-0 bg-oxblood" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Cache icon definitions so we don't recreate them per card.
const ICONS = [
  { d: ["M6 3h9l3 3v15H6z", "M9 9h6M9 13h6M9 17h4"] },
  { d: ["M4 4h16v16H4z", "M4 9h16M4 14h16M9 4v16"] },
  { d: ["M4 18l5-7 4 3 7-9", "M14 5h6v6"] },
  { d: ["M21 21l-6-6"], circles: [{ cx: 11, cy: 11, r: 6 }] },
  { d: ["M4 19V5l8 5 8-5v14", "M4 19h16"] },
  { d: ["M3 6h18v12H3z", "M6 9v6M18 9v6"], circles: [{ cx: 12, cy: 12, r: 2.5 }] },
  { d: ["M12 3l9 16H3z", "M12 10v4M12 17v.5"] },
  { d: ["M3 5h18v16H3z", "M3 9h18M8 3v4M16 3v4"] },
];

function ServiceIcon({ dark, index }: { dark: boolean; index: number }) {
  const stroke = dark ? "#EFEAE0" : "#0F1417";
  const icon = ICONS[index % ICONS.length];
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      aria-hidden
    >
      {icon.d.map((d, i) => (
        <path key={i} d={d} />
      ))}
      {icon.circles?.map((c, i) => (
        <circle key={`c${i}`} cx={c.cx} cy={c.cy} r={c.r} />
      ))}
    </svg>
  );
}
