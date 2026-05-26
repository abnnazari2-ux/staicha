import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import { insights } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspective from the firm on audit, tax, and advisory matters. Written for sophisticated non-specialists by partners at Staicha.",
  alternates: { canonical: "/insights" },
};

const offsets = ["md:mt-0", "md:mt-s8", "md:mt-s5"];

export default function InsightsPage() {
  return (
    <>
      <section className="bg-ink text-bone pt-s10 pb-s9 min-h-[55vh] flex items-end">
        <div className="max-w-content mx-auto px-s5 md:px-s7 w-full">
          <p className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s5">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood-tint align-middle mr-s2" />
            From the firm
          </p>
          <h1 className="font-serif font-light leading-[1.04] tracking-display text-[clamp(48px,8vw,108px)] text-bone">
            Insights.
          </h1>
          <p className="mt-s5 font-sans text-[16px] leading-[1.65] text-silver max-w-[58ch]">
            Considered perspective on audit, tax, and advisory matters. Written by partners; published when there is something to say.
          </p>
        </div>
      </section>

      <section className="bg-bone py-s10">
        <div className="max-w-content mx-auto px-s5 md:px-s7">
          <div className="flex flex-wrap gap-s3 mb-s8 font-mono text-[10px] tracking-mono-up uppercase">
            {["All", "Audit", "Tax", "Advisory"].map((c) => (
              <span
                key={c}
                className={[
                  "px-s4 py-s2 border",
                  c === "All" ? "border-ink bg-ink text-bone" : "border-silver/60 text-graphite",
                ].join(" ")}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-s7">
            {insights.map((post, i) => (
              <SectionReveal key={post.slug} delay={i * 0.1} className={offsets[i] || ""}>
                <Link href={`/insights/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-bone-2 mb-s5">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
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
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
