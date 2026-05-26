"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const STORAGE_KEY = "staicha:intro-played";

/**
 * One-shot monogram intro on the first visit of a session. Total runtime
 * is ~900ms and the user can scroll the moment the overlay slides off.
 */
export default function PageLoadSequence() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduce) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setShow(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, [reduce]);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setShow(false), 700);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-ink flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/logos/svg/monogram-reversed.svg" alt="" width={96} height={96} priority />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
