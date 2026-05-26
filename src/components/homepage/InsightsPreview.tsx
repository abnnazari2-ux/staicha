import Link from "next/link";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Insight } from "@/content/insights";

const offsets = ["md:mt-0", "md:mt-s8", "md:mt-s5"];

export default function InsightsPreview({ posts }: { posts: Insight[] }) {
  return (
    <section className="bg-paper py-s10">
      <div className="max-w-content mx-auto px-s5 md:px-s7">
        <div className="flex items-end justify-between flex-wrap gap-s5 mb-s8">
          <div>
            <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-oxblood align-middle mr-s2" />
              From the firm
            </p>
            <h2 className="mt-s3 font-serif font-light leading-[1.05] tracking-display text-[clamp(40px,5.5vw,72px)] text-ink">
              Insights.
            </h2>
          </div>
          <Link href="/insights" className="link-underline font-sans text-[14px] text-oxblood">
            View all insights →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-s6">
          {posts.map((post, i) => (
            <SectionReveal key={post.slug} delay={i * 0.1} className={offsets[i] || ""}>
              <Link href={`/insights/${post.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-bone-2 mb-s5">
                  <Image
                    src={post.image}
                    alt={`Illustration for ${post.title}`}
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
                <h3 className="font-serif text-[22px] leading-[1.25] text-ink group-hover:text-oxblood transition-colors mb-s3">
                  {post.title}
                </h3>
                <p className="font-sans text-[14px] text-graphite leading-[1.55] line-clamp-2 mb-s4">
                  {post.excerpt}
                </p>
                <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter">
                  {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
