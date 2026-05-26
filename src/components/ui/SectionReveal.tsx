"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Renders children inside a motion.div with a fade-up reveal on first
 * intersection. The `data-reveal` attribute is targeted by a <noscript>
 * style in the root layout that forces opacity 1 / transform none when
 * JavaScript is disabled, so the content is never silently invisible.
 */
export default function SectionReveal({
  children,
  delay = 0,
  className = "",
  y = 40,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
