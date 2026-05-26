"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Insight } from "@/content/insights";

const categories = ["All", "Audit", "Tax", "Advisory", "General"] as const;
type Category = (typeof categories)[number];

const offsets = ["md:mt-0", "md:mt-s8", "md:mt-s5"];

export default function InsightsGrid({ posts }: { posts: Insight[] }) {
  const [active, setActive] = useState<Category>("All");
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.category === active);
  }, [active, posts]);

  const visibleCategories = categories.filter(
    (c) => c === "All" || posts.some((p) => p.category === c)
  );

  return (
    <>
      <div className="flex flex-wrap gap-s3 mb-s8 font-mono text-[10px] tracking-mono-up uppercase" role="tablist" aria-label="Filter by category">
        {visibleCategories.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActive(c)}
              className={[
                "px-s4 py-s2 border transition-colors",
                isActive
                  ? "border-ink bg-ink text-bone"
                  : "border-silver/60 text-graphite hover:border-ink hover:text-ink",
              ].join(" ")}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-s7 min-h-[40vh]">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : i * 0.05 }}
              className={offsets[i % offsets.length] || ""}
            >
              <Link href={`/insights/${post.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-bone-2 mb-s5">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-bone opacity-[0.05] group-hover:opacity-0 transition-opacity duration-500" />
                </div>
                <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter mb-s3">
                  <span className="inline-block w-[5px] h-[5px] rounded-full bg-oxblood align-middle mr-s2" />
                  {post.category}
                </p>
                <h2 className="font-serif text-[22px] leading-[1.25] text-ink group-hover:text-oxblood transition-colors mb-s3">
                  {post.title}
                </h2>
                <p className="font-sans text-[14px] text-graphite leading-[1.6] line-clamp-3 mb-s4">
                  {post.excerpt}
                </p>
                <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter">
                  {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.author}
                </p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="font-sans text-[14px] text-graphite mt-s5">
          No articles in this category yet.
        </p>
      )}
    </>
  );
}
