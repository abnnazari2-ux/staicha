import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import NewsletterForm from "@/components/layout/NewsletterForm";

type FooterService = { slug: string; title: string };

export default function Footer({ services }: { services: FooterService[] }) {
  return (
    <footer className="bg-ink text-bone" data-theme="dark">
      <div className="max-w-content mx-auto px-s5 md:px-s7 pt-s9 pb-s6">
        <div className="flex justify-center pb-s8 border-b border-bone/10">
          <Image
            src="/logos/svg/horizontal-descriptor-reversed.svg"
            alt="Staicha — Chartered Accountants · Advisors · London"
            width={520}
            height={104}
            className="h-16 w-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-s7 py-s8">
          <div>
            <h3 className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s4">Services</h3>
            <ul className="space-y-s2">
              {services.map((s) => (
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
              <p>{site.address.street}<br />{site.address.locality} {site.address.postcode}</p>
              <p><a href={site.contact.phoneHref} className="hover:text-oxblood-tint">{site.contact.phone}</a></p>
              <p><a href={`mailto:${site.contact.email}`} className="hover:text-oxblood-tint">{site.contact.email}</a></p>
            </address>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-mono-up uppercase text-silver mb-s4">Newsletter</h3>
            <p className="font-sans text-[13px] text-bone/70 mb-s3">Quarterly perspective from the firm. No marketing.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-s5 border-t border-bone/10 flex flex-col md:flex-row items-center justify-between gap-s3">
          <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter">
            {site.copyright}
          </p>
          <p className="font-mono text-[10px] tracking-mono-up uppercase text-pewter">
            {site.registration}
          </p>
        </div>
      </div>
    </footer>
  );
}
