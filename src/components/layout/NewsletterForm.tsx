"use client";

import { useState } from "react";
import { site } from "@/content/site";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // Clear any prior banner the moment the user re-submits.
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "content-type": "application/json" },
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex border border-bone/20" aria-label="Newsletter signup">
        <label htmlFor="newsletter" className="sr-only">Email address</label>
        <input
          id="newsletter"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email"
          className="flex-1 min-w-0 bg-transparent px-s3 py-s3 text-[13px] font-sans text-bone placeholder:text-pewter focus:outline-none"
        />
        <button
          type="submit"
          className="px-s4 bg-oxblood hover:bg-oxblood-2 text-bone text-[11px] tracking-mono-up uppercase font-mono"
        >
          Subscribe
        </button>
      </form>
      {status === "ok" && (
        <p role="status" className="mt-s3 font-sans text-[12px] text-verdant">
          Thank you. You will hear from us quarterly.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-s3 font-sans text-[12px] text-oxblood-tint">
          Something went wrong. Email us at {site.contact.email}.
        </p>
      )}
    </>
  );
}
