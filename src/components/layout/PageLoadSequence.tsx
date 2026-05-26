"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const STORAGE_KEY = "staicha:intro-played";

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
    // Lock scroll while the intro plays.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setShow(false), 1600);
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
          transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1], delay: 0.2 }}
          className="fixed inset-0 z-[200] bg-ink flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0.6],
              scale: [1, 1, 1, 0.5],
              x: [0, 0, 0, "-42vw"],
              y: [0, 0, 0, "-42vh"],
            }}
            transition={{
              times: [0, 0.2, 0.6, 1],
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/logos/svg/monogram-reversed.svg"
              alt=""
              width={120}
              height={120}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
