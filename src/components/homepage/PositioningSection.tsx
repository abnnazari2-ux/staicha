"use client";

import { motion, useReducedMotion } from "framer-motion";

const lines = [
  "The firm called when the numbers",
  "must hold up — to the board, to HMRC,",
  "to the room across the deal table.",
];

export default function PositioningSection() {
  const reduce = useReducedMotion();
  return (
    <section className="min-h-[100vh] bg-bone flex items-center py-s10">
      <div className="max-w-content mx-auto px-s5 md:px-s7 grid grid-cols-[2px_1fr] gap-s6 md:gap-s7 items-start">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="bg-oxblood w-[2px] h-[120px] origin-top mt-s4"
          aria-hidden
        />
        <div>
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-pewter mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
            Positioning
          </p>
          <h2 className="font-serif font-light leading-[1.08] tracking-display text-[clamp(32px,5vw,72px)] text-ink">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1 + i * 0.15,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
          <p className="mt-s8 font-mono text-[10px] tracking-mono-up uppercase text-pewter">
            EST. MMXXVI · London EC2
          </p>
        </div>
      </div>
    </section>
  );
}
