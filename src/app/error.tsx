"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[page error]", error);
  }, [error]);

  return (
    <section className="bg-ink text-bone min-h-[80vh] flex items-center" data-theme="dark">
      <div className="max-w-content mx-auto px-s5 md:px-s7">
        <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood-tint mb-s5">
          Error
        </p>
        <h1 className="font-serif font-light leading-[1.04] tracking-display text-[clamp(40px,6vw,80px)] text-bone max-w-[22ch]">
          Something stopped the page mid-thought.
        </h1>
        <p className="mt-s6 font-sans text-[16px] leading-[1.65] text-silver max-w-[52ch]">
          The firm has been notified. You can try again, or return to the homepage.
        </p>
        <div className="mt-s7 flex flex-wrap items-center gap-s5">
          <button
            type="button"
            onClick={reset}
            className="px-s6 py-s4 bg-oxblood hover:bg-oxblood-tint text-bone font-sans text-[12px] tracking-kicker uppercase transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="link-underline font-sans text-[14px] text-bone">
            Return to the homepage →
          </Link>
        </div>
        {error.digest && (
          <p className="mt-s8 font-mono text-[10px] tracking-mono-up uppercase text-pewter">
            Reference · {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
