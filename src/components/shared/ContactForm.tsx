"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "content-type": "application/json" },
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  const field =
    "w-full bg-transparent border-b border-silver focus:border-oxblood font-sans text-[15px] py-s3 placeholder:text-pewter focus:outline-none transition-colors";
  const label = "block font-mono text-[10px] tracking-mono-up uppercase text-pewter mb-s2";

  return (
    <form onSubmit={onSubmit} className="space-y-s5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-s5">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" type="text" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" required className={field} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="company" className={label}>Company</label>
          <input id="company" name="company" type="text" className={field} placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone (optional)</label>
          <input id="phone" name="phone" type="tel" className={field} placeholder="+44" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className={label}>Subject</label>
        <select id="subject" name="subject" required className={`${field} appearance-none`} defaultValue="">
          <option value="" disabled>Choose a subject</option>
          <option>General enquiry</option>
          <option>Audit &amp; Assurance</option>
          <option>Tax Advisory</option>
          <option>Corporate Finance</option>
          <option>Careers</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" required rows={5} className={`${field} resize-y`} placeholder="Tell us about your engagement." />
      </div>

      <div className="pt-s4 flex items-center gap-s5">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-s3 px-s6 py-s4 bg-oxblood hover:bg-oxblood-tint text-bone font-sans text-[12px] tracking-kicker uppercase transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message →"}
        </button>
        {status === "success" && (
          <p className="font-sans text-[13px] text-verdant" role="status">
            Thank you. The firm will respond within the working day.
          </p>
        )}
        {status === "error" && (
          <p className="font-sans text-[13px] text-garnet" role="alert">
            {error ?? "Something went wrong. Please email contact@staicha.com."}
          </p>
        )}
      </div>
    </form>
  );
}
