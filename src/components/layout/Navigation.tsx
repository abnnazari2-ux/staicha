"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className={[
          "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
          scrolled ? "bg-paper/90 backdrop-blur-md border-b border-silver/30" : "bg-transparent",
        ].join(" ")}
      >
        <nav className="max-w-content mx-auto px-s5 md:px-s7 h-[72px] flex items-center justify-between">
          <Link href="/" aria-label="Staicha home" className="flex items-center">
            <Image
              src="/logos/svg/wordmark-primary.svg"
              alt="Staicha"
              width={140}
              height={32}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <ul className="hidden md:flex items-center gap-s7">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={[
                      "group relative font-sans text-[14px] tracking-[0.02em] transition-colors",
                      active ? "text-oxblood" : "text-ink hover:text-oxblood",
                    ].join(" ")}
                  >
                    <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contact"
                className="font-sans text-[13px] tracking-kicker uppercase px-s4 py-s3 border border-oxblood text-oxblood hover:bg-oxblood hover:text-bone transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-2"
          >
            <span className={`block w-6 h-[1.5px] bg-ink transition-transform ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-ink transition-transform ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-ink md:hidden flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-s5">
              {[...links, { href: "/contact", label: "Contact" }].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    className="font-serif text-[36px] text-bone hover:text-oxblood-tint transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Image
              src="/logos/svg/monogram-reversed.svg"
              alt=""
              width={36}
              height={36}
              className="absolute bottom-s8 opacity-70"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
