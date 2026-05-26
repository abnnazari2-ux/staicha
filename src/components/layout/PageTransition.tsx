"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const reduce = useReducedMotion();
  const first = useRef(true);
  const [wipeKey, setWipeKey] = useState<string | null>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) return;
    setWipeKey(pathname);
    const t = window.setTimeout(() => setWipeKey(null), 700);
    return () => clearTimeout(t);
  }, [pathname, reduce]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {wipeKey && (
          <motion.div
            key={wipeKey}
            aria-hidden
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-[150] bg-ink pointer-events-none flex items-center justify-center"
          >
            <span className="block w-3 h-3 rounded-full bg-oxblood-tint" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
