"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
};

/**
 * Animated counter that rolls each digit from 0 to the target. The final
 * value is also rendered in an SR-only span so search engines and JS-disabled
 * users see the real number, not "0".
 */
export default function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1500,
  decimals = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const final = formatNumber(to, decimals);
  const [display, setDisplay] = useState<string>(() => (reduce ? final : zerosLike(final)));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(final);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const v = to * ease(p);
      setDisplay(formatNumber(v, decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, decimals, reduce, final]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {/* SEO + no-JS: real value visible to crawlers */}
      <span className="sr-only">
        {prefix}
        {final}
        {suffix}
      </span>
      <span aria-hidden className="inline-flex items-baseline">
        {prefix && <span>{prefix}</span>}
        {Array.from(display).map((ch, i) =>
          /\d/.test(ch) ? (
            <DigitRoll key={`${i}-${ch}`} value={Number(ch)} active={inView && !reduce} />
          ) : (
            <span key={`${i}-${ch}-sep`}>{ch}</span>
          )
        )}
        {suffix && <span>{suffix}</span>}
      </span>
    </span>
  );
}

function DigitRoll({ value, active }: { value: number; active: boolean }) {
  // A vertical column of 0–9; we translate to the target row.
  return (
    <span className="inline-block overflow-hidden" style={{ height: "1em", lineHeight: 1 }}>
      <span
        className="inline-block"
        style={{
          transform: `translateY(-${value * 10}%)`,
          transition: active ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="block" style={{ height: "1em", lineHeight: 1 }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

function zerosLike(value: string): string {
  return value.replace(/\d/g, "0");
}

function formatNumber(n: number, decimals: number): string {
  return n.toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
