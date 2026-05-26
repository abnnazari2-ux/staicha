import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-ink text-bone min-h-[80vh] flex items-center">
      <div className="max-w-content mx-auto px-s5 md:px-s7">
        <p className="font-mono text-[11px] tracking-mono-up uppercase text-oxblood-tint mb-s5">
          Error 404
        </p>
        <h1 className="font-serif font-light leading-[1.04] tracking-display text-[clamp(48px,8vw,108px)] text-bone max-w-[22ch]">
          The page is not where you left it.
        </h1>
        <p className="mt-s6 font-sans text-[16px] leading-[1.65] text-silver max-w-[52ch] mb-s8">
          The address you followed is no longer in use, or has been moved.
        </p>
        <Link href="/" className="link-underline font-sans text-[14px] text-bone">
          Return to the homepage →
        </Link>
      </div>
    </section>
  );
}
