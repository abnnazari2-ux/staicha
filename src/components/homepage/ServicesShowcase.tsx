"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/content/services";

export default function ServicesShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Move from 0% to roughly -(N-1) * card width
  const total = services.length;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(total - 1) * (100 / total)}%`]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative bg-paper"
      style={{ height: `${total * 70}vh` }}
      aria-label="Services"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="px-s5 md:px-s7 pt-s9 pb-s5 max-w-content w-full mx-auto">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s3">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
            Services
          </p>
          <h2 className="font-serif font-light leading-[1.05] tracking-display text-[clamp(40px,5.5vw,72px)] text-ink">
            What we do.
          </h2>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <motion.ul
            style={{ x }}
            className="flex gap-s6 px-s5 md:px-s7 will-change-transform"
          >
            {services.map((s, i) => {
              const dark = i % 2 === 1;
              return (
                <li
                  key={s.slug}
                  className={[
                    "shrink-0 w-[80vw] md:w-[55vw] lg:w-[48vw] h-[58vh] p-s7 md:p-s8 flex flex-col justify-between transition-colors",
                    dark ? "bg-ink text-bone" : "bg-bone text-ink",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-mono text-[10px] tracking-mono-up uppercase ${dark ? "text-silver" : "text-pewter"}`}>
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <ServiceIcon dark={dark} index={i} />
                  </div>
                  <div>
                    <h3 className="font-serif font-light leading-[1.15] text-[clamp(24px,2.5vw,34px)] mb-s4">
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
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <div className="px-s5 md:px-s7 pb-s7 max-w-content w-full mx-auto">
          <div className="h-px bg-silver/40 relative overflow-hidden">
            <motion.div style={{ width: progress }} className="absolute inset-y-0 left-0 bg-oxblood" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ dark, index }: { dark: boolean; index: number }) {
  const stroke = dark ? "#EFEAE0" : "#0F1417";
  // Rotate through simple line icons keyed to the service category
  const variants = [
    // Document
    <svg key="doc" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5"><path d="M6 3h9l3 3v15H6z"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>,
    // Ledger
    <svg key="led" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5"><rect x="4" y="4" width="16" height="16"/><path d="M4 9h16M4 14h16M9 4v16"/></svg>,
    // Forecast
    <svg key="fc" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5"><path d="M4 18l5-7 4 3 7-9"/><path d="M14 5h6v6"/></svg>,
    // Audit
    <svg key="aud" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5"><circle cx="11" cy="11" r="6"/><path d="M21 21l-6-6"/></svg>,
    // Advisory
    <svg key="adv" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5"><path d="M4 19V5l8 5 8-5v14"/><path d="M4 19h16"/></svg>,
    // Payroll
    <svg key="pay" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5"><rect x="3" y="6" width="18" height="12"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/></svg>,
    // Risk
    <svg key="rsk" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5"><path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17v.5"/></svg>,
    // Period
    <svg key="prd" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5"><rect x="3" y="5" width="18" height="16"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
  ];
  return variants[index % variants.length];
}
