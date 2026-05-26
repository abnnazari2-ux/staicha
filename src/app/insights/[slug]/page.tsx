import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SectionReveal from "@/components/ui/SectionReveal";
import { insights } from "@/content/insights";
import { team } from "@/content/team";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = insights.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/insights/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      images: [p.image],
      publishedTime: p.date,
      authors: [p.author],
    },
  };
}

export default function InsightArticle({ params }: { params: { slug: string } }) {
  const post = insights.find((p) => p.slug === params.slug);
  if (!post) notFound();
  const author = team.find((t) => post.author.includes(t.name.split(" ")[0]));
  const related = insights.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="bg-ink text-bone pt-s10 pb-s9">
          <div className="max-w-3xl mx-auto px-s5 md:px-s7">
            <Link href="/insights" className="font-mono text-[10px] tracking-mono-up uppercase text-silver hover:text-oxblood-tint mb-s5 inline-block">
              ← Back to Insights
            </Link>
            <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood-tint mb-s4">
              <span className="inline-block w-[5px] h-[5px] rounded-full bg-oxblood-tint align-middle mr-s2" />
              {post.category}
            </p>
            <h1 className="font-serif font-light leading-[1.1] tracking-display text-[clamp(32px,5vw,60px)] text-bone">
              {post.title}
            </h1>
            <div className="mt-s7 flex flex-wrap items-center gap-s5 font-mono text-[10px] tracking-mono-up uppercase text-silver">
              <span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>· {post.author}</span>
            </div>
          </div>
        </header>

        <div className="bg-bone">
          <div className="relative aspect-[16/8] max-w-content mx-auto">
            <Image
              src={post.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <section className="bg-bone py-s10">
          <div className="max-w-content mx-auto px-s5 md:px-s7 grid grid-cols-1 lg:grid-cols-12 gap-s7">
            <div className="lg:col-span-8 space-y-s5 font-serif text-[18px] leading-[1.65] text-ink-2 max-w-[68ch]">
              {post.body.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <SectionReveal key={i}>
                      <h2 className="font-serif text-[clamp(24px,2.4vw,32px)] leading-[1.25] text-ink mt-s7">
                        {block.text}
                      </h2>
                    </SectionReveal>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <SectionReveal key={i}>
                      <blockquote className="font-serif italic text-[clamp(20px,2.2vw,26px)] leading-[1.4] text-ink border-l-2 border-oxblood pl-s5 my-s7">
                        “{block.text}”
                      </blockquote>
                    </SectionReveal>
                  );
                }
                return (
                  <SectionReveal key={i}>
                    <p>{block.text}</p>
                  </SectionReveal>
                );
              })}
            </div>

            <aside className="lg:col-span-4 lg:pl-s7 lg:border-l border-silver/40 space-y-s7">
              {author && (
                <div>
                  <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s4">Author</p>
                  <h3 className="font-serif text-[20px] text-ink">{author.name}</h3>
                  <p className="font-sans text-[13px] text-graphite mb-s3">{author.title}</p>
                  <p className="font-serif text-[14px] leading-[1.6] text-graphite">{author.bio}</p>
                </div>
              )}
              <div>
                <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood mb-s4">Related</p>
                <ul className="space-y-s4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/insights/${r.slug}`} className="block group">
                        <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter mb-s2">{r.category}</p>
                        <p className="font-serif text-[16px] leading-[1.3] text-ink group-hover:text-oxblood transition-colors">
                          {r.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author },
            publisher: { "@type": "Organization", name: "Staicha LLP" },
            image: post.image,
            articleSection: post.category,
          }),
        }}
      />
    </>
  );
}
