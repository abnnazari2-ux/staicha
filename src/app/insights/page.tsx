import type { Metadata } from "next";
import InsightsGrid from "@/components/shared/InsightsGrid";
import { readCollection } from "@/lib/cms";
import { JsonLd, breadcrumbsLd } from "@/lib/jsonLd";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspective from the firm on audit, tax, and advisory matters. Written for sophisticated non-specialists by partners at Staicha.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const insights = await readCollection("insights");
  return (
    <>
      <section className="bg-ink text-bone pt-s10 pb-s9 min-h-[55vh] flex items-end" data-theme="dark">
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
          <InsightsGrid posts={insights} />
        </div>
      </section>

      <JsonLd
        data={breadcrumbsLd([
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
        ])}
      />
    </>
  );
}
