import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="max-w-content mx-auto px-s5 md:px-s7 pt-s9 pb-s6">
        <div className="flex justify-center pb-s8 border-b border-bone/10">
          <Image
            src="/logos/svg/horizontal-descriptor.svg"
            alt="Staicha — Chartered Accountants · Advisors · London"
            width={520}
            height={48}
            className="h-12 w-auto opacity-90 invert"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-s7 py-s8">
          <div>
            <h3 className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s4">Services</h3>
            <ul className="space-y-s2">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-sans text-[14px] text-bone/80 hover:text-oxblood-tint transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s4">The Firm</h3>
            <ul className="space-y-s2">
              <li><Link href="/about" className="font-sans text-[14px] text-bone/80 hover:text-oxblood-tint">About</Link></li>
              <li><Link href="/team" className="font-sans text-[14px] text-bone/80 hover:text-oxblood-tint">Team</Link></li>
              <li><Link href="/insights" className="font-sans text-[14px] text-bone/80 hover:text-oxblood-tint">Insights</Link></li>
              <li><Link href="/careers" className="font-sans text-[14px] text-bone/80 hover:text-oxblood-tint">Careers</Link></li>
              <li><Link href="/contact" className="font-sans text-[14px] text-bone/80 hover:text-oxblood-tint">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s4">Contact</h3>
            <address className="not-italic font-sans text-[14px] text-bone/80 space-y-s2">
              <p>14 Throgmorton Avenue<br />London EC2N 2DL</p>
              <p><a href="tel:+442079460118" className="hover:text-oxblood-tint">+44 20 7946 0118</a></p>
              <p><a href="mailto:contact@staicha.com" className="hover:text-oxblood-tint">contact@staicha.com</a></p>
            </address>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s4">Newsletter</h3>
            <p className="font-sans text-[13px] text-bone/70 mb-s3">Quarterly perspective from the firm. No marketing.</p>
            <form className="flex border border-bone/20" aria-label="Newsletter signup">
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder="your@email"
                className="flex-1 bg-transparent px-s3 py-s3 text-[13px] font-sans text-bone placeholder:text-pewter focus:outline-none"
              />
              <button type="submit" className="px-s4 bg-oxblood hover:bg-oxblood-2 text-bone text-[11px] tracking-mono-up uppercase font-mono">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-s5 border-t border-bone/10 flex flex-col md:flex-row items-center justify-between gap-s3">
          <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter">
            © 2026 Staicha LLP. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter">
            Registered in England &amp; Wales — OC 478 921
          </p>
        </div>
      </div>
    </footer>
  );
}
