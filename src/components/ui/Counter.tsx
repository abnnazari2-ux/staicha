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
 * Animated counter that rolls each digit independently from 0 to its target.
 *
 * The visible "tape" preserves the column count of the final value so the
 * layout never shifts. The real, formatted value is also rendered in an
 * sr-only span so search engines and JS-disabled users see the final number.
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

  // Pad the running display to the final-width so column count never changes.
  const [display, setDisplay] = useState<string>(() =>
    reduce ? final : final.replace(/\d/g, "0")
  );

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
      setDisplay(padToWidth(formatNumber(v, decimals), final));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, decimals, reduce, final]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {/* SEO + no-JS: real value in a single string template, no hydration comments. */}
      <span className="sr-only">{`${prefix}${final}${suffix}`}</span>
      <span aria-hidden className="inline-flex items-baseline">
        {prefix && <span>{prefix}</span>}
        {Array.from(display).map((ch, i) =>
          /\d/.test(ch) ? (
            // Stable position-only key so the same DOM node persists and the
            // CSS transform transition actually fires when the digit changes.
            <DigitRoll key={`pos-${i}`} value={Number(ch)} active={inView && !reduce} />
          ) : (
            <span key={`pos-${i}`}>{ch}</span>
          )
        )}
        {suffix && <span>{suffix}</span>}
      </span>
    </span>
  );
}

function DigitRoll({ value, active }: { value: number; active: boolean }) {
  return (
    <span className="inline-block overflow-hidden" style={{ height: "1em", lineHeight: 1 }}>
      <span
        className="inline-block"
        style={{
          transform: `translateY(-${value * 10}%)`,
          transition: active ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
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

// Pad a running display to match the character layout of the final value:
// leading "0"s where the final has digits, identical separators in place.
function padToWidth(current: string, final: string): string {
  if (current.length >= final.length) return current;
  const out: string[] = [];
  let ci = current.length - 1;
  for (let fi = final.length - 1; fi >= 0; fi--) {
    const fch = final[fi];
    if (/\d/.test(fch)) {
      if (ci >= 0 && /\d/.test(current[ci])) {
        out.unshift(current[ci--]);
      } else {
        out.unshift("0");
      }
    } else {
      out.unshift(fch);
      if (ci >= 0 && current[ci] === fch) ci--;
    }
  }
  return out.join("");
}

function formatNumber(n: number, decimals: number): string {
  return n.toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
