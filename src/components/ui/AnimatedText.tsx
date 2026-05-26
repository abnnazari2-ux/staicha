"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: "word" | "line";
};

export default function AnimatedText({
  children,
  as = "p",
  className = "",
  delay = 0,
  stagger = 0.04,
  by = "word",
}: Props) {
  const reduce = useReducedMotion();
  const Tag = as as React.ElementType;

  if (reduce) {
    return (
      <Tag className={className}>
        {children.split("\n").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const lines = children.split("\n");

  return (
    <Tag className={className}>
      <span className="sr-only">{children}</span>
      {lines.map((line, li) => {
        const tokens =
          by === "word" ? line.split(/(\s+)/) : [line];
        let runningIndex = 0;
        return (
          <span key={li} className="block" aria-hidden>
            {tokens.map((part, i) => {
              if (/^\s+$/.test(part)) return <span key={i}>{" "}</span>;
              const orderIndex = runningIndex++;
              return (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: "110%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                      delay: delay + (li * 0.15) + orderIndex * stagger,
                    }}
                  >
                    {part}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
