"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("has-custom-cursor");
    const el = dot.current!;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [role=button], input, textarea, select, label");
      el.classList.toggle("is-hover", !!interactive);
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] w-2 h-2 rounded-full bg-oxblood mix-blend-difference transition-[width,height,background-color] duration-200 ease-out hidden md:block"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <style jsx global>{`
        .has-custom-cursor .is-hover,
        .has-custom-cursor div[aria-hidden].is-hover {
          width: 36px;
          height: 36px;
        }
      `}</style>
    </>
  );
}
