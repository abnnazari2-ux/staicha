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

// Pages whose top section is dark — used so the nav SSRs with the correct
// logo variant for the first paint, before the probe takes over on scroll.
const DARK_HERO_ROUTES = ["/", "/about", "/services", "/team", "/insights", "/careers"];

function pathStartsDark(pathname: string): boolean {
  if (DARK_HERO_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith("/services/")) return true;
  if (pathname.startsWith("/insights/")) return true;
  return false;
}

export default function Navigation() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState<boolean>(() => pathStartsDark(pathname));

  // Scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme detection: walk through declared [data-theme] sections and mark
  // the nav dark whenever a dark section overlaps the navbar's vertical band.
  // Uses IntersectionObserver so we only react when section boundaries cross
  // the band, not on every scroll frame.
  useEffect(() => {
    const navHeight = 72;
    // Sentinel band: 1px-tall strip centred on the nav.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme]"));
    if (sections.length === 0) {
      setDark(pathStartsDark(pathname));
      return;
    }
    const observer = new IntersectionObserver(
      () => {
        // Determine which section overlaps the band right now.
        for (const s of sections) {
          const rect = s.getBoundingClientRect();
          if (rect.top <= navHeight / 2 && rect.bottom >= navHeight / 2) {
            setDark(s.dataset.theme === "dark");
            return;
          }
        }
        // No section overlaps: fall back to heuristic.
        setDark(pathStartsDark(pathname));
      },
      {
        // Trigger only when the band crosses a section boundary.
        rootMargin: `-${navHeight / 2}px 0px -${window.innerHeight - navHeight / 2 - 1}px 0px`,
      }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key closes the mobile menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Reset the dark probe whenever pathname changes — initial render of the new route uses the heuristic again.
  useEffect(() => {
    setDark(pathStartsDark(pathname));
  }, [pathname]);

  // When the navigation is over a dark hero (and not yet scrolled past it) — show the reversed logo.
  const showReversed = dark && !scrolled;
  const linkColor = showReversed ? "text-bone hover:text-oxblood-tint" : "text-ink hover:text-oxblood";
  const activeColor = showReversed ? "text-oxblood-tint" : "text-oxblood";
  const hamburgerColor = showReversed ? "bg-bone" : "bg-ink";
  const contactBtn = showReversed
    ? "border-oxblood-tint text-oxblood-tint hover:bg-oxblood-tint hover:text-ink"
    : "border-oxblood text-oxblood hover:bg-oxblood hover:text-bone";

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className={[
          "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
          scrolled
            ? "bg-paper/90 backdrop-blur-md border-b border-silver/30"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="max-w-content mx-auto px-s5 md:px-s7 h-[72px] flex items-center justify-between">
          <Link href="/" aria-label={`${pathname === "/" ? "Staicha home" : "Return to Staicha home"}`} className="flex items-center">
            <Image
              src={showReversed ? "/logos/svg/wordmark-reversed.svg" : "/logos/svg/wordmark-primary.svg"}
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
                    aria-current={active ? "page" : undefined}
                    className={[
                      "group relative font-sans text-[14px] tracking-[0.02em] transition-colors",
                      active ? activeColor : linkColor,
                    ].join(" ")}
                  >
                    <span
                      aria-hidden
                      className={`inline-block w-[6px] h-[6px] rounded-full ${showReversed ? "bg-oxblood-tint" : "bg-oxblood"} mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200`}
                    />
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contact"
                className={`font-sans text-[13px] tracking-kicker uppercase px-s4 py-s3 border transition-colors ${contactBtn}`}
              >
                Contact
              </Link>
            </li>
          </ul>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-2"
          >
            <span className={`block w-6 h-[1.5px] transition-transform ${hamburgerColor} ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] transition-opacity ${hamburgerColor} ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[1.5px] transition-transform ${hamburgerColor} ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
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
                    className="font-serif text-[36px] text-bone hover:text-oxblood-tint focus-visible:text-oxblood-tint transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Image
              src="/logos/svg/monogram-reversed.svg"
              alt=""
              width={44}
              height={44}
              className="absolute bottom-s8 opacity-70"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
