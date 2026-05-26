"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

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
    return <Tag className={className}>{children}</Tag>;
  }

  const parts = by === "word" ? children.split(/(\s+)/) : children.split("\n");

  return (
    <Tag className={className}>
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) return <span key={i}>{part}</span>;
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden={false}>
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * stagger,
              }}
            >
              {part}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
