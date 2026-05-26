"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const eyebrow = "CHARTERED ACCOUNTANTS & ADVISORS · LONDON";

  return (
    <section
      ref={ref}
      className="relative h-[100vh] flex flex-col items-center justify-center bg-ink text-bone overflow-hidden"
      aria-label="Staicha — Numbers, with conviction"
    >
      <motion.div
        style={{ scale, opacity }}
        className="text-center px-s5 max-w-content"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-center gap-s3"
        >
          <h1 className="font-serif font-light leading-[0.96] tracking-display text-[clamp(72px,11vw,160px)]">
            Staicha
          </h1>
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="block w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full bg-oxblood mb-[18px] md:mb-[26px]"
            aria-hidden
          />
        </motion.div>

        <p className="mt-s5 font-mono text-[10px] md:text-[11px] tracking-mono-up text-silver" aria-label={eyebrow}>
          {eyebrow.split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.012, duration: 0.3 }}
              className="inline-block"
            >
              {c === " " ? " " : c}
            </motion.span>
          ))}
        </p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-s7 font-serif font-light italic text-[clamp(24px,3vw,44px)] text-bone"
        >
          Numbers, with conviction.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-s6 mx-auto h-px w-[80px] bg-oxblood-tint origin-left"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-s8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-s2"
      >
        <span className="font-mono text-[9px] tracking-mono-up text-silver uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block w-[6px] h-[6px] rounded-full bg-oxblood-tint"
        />
      </motion.div>
    </section>
  );
}
