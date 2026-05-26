"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "filled" | "outlined";
};

export default function MagneticButton({
  href,
  onClick,
  children,
  className = "",
  variant = "filled",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = 100;
      if (dist < radius) {
        tx = dx * 0.25;
        ty = dy * 0.25;
      } else {
        tx = 0;
        ty = 0;
      }
    };
    const reset = () => { tx = 0; ty = 0; };
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", reset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  const styles =
    variant === "filled"
      ? "bg-oxblood text-bone hover:bg-oxblood-tint"
      : "border border-ink text-ink hover:bg-ink hover:text-bone";

  const inner = (
    <div ref={ref} className="inline-block will-change-transform">
      <span
        className={[
          "inline-flex items-center gap-s3 px-s6 py-s4 font-sans text-[13px] tracking-kicker uppercase transition-colors duration-300",
          styles,
          className,
        ].join(" ")}
      >
        {children}
      </span>
    </div>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return (
    <button type="button" onClick={onClick}>
      {inner}
    </button>
  );
}
