/**
 * mailer.ts — Sends form submissions.
 *
 * Order of preference:
 *   1. If RESEND_API_KEY is set, send via Resend.
 *   2. If SUBMISSIONS_DIR is writable, append a JSON line.
 *   3. Always also console.log so submissions are never lost.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { site } from "@/content/site";

type Submission = {
  kind: "contact" | "newsletter";
  payload: Record<string, unknown>;
  receivedAt: string;
  ip?: string;
};

const SUBMISSIONS_DIR = path.join(process.cwd(), "submissions");

async function persistToDisk(s: Submission): Promise<boolean> {
  try {
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
    const file = path.join(SUBMISSIONS_DIR, `${s.kind}.jsonl`);
    await fs.appendFile(file, JSON.stringify(s) + "\n", "utf8");
    return true;
  } catch {
    return false;
  }
}

async function sendViaResend(s: Submission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const to = process.env.CONTACT_EMAIL || site.contact.email;
  const from = process.env.MAIL_FROM || `Staicha Website <noreply@${new URL(site.url).hostname}>`;
  const subject =
    s.kind === "contact"
      ? `New enquiry: ${(s.payload.subject as string | undefined) ?? "General"}`
      : "New newsletter signup";
  const lines = Object.entries(s.payload).map(([k, v]) => `${k}: ${String(v)}`);
  const text = `${lines.join("\n")}\n\nReceived ${s.receivedAt}${s.ip ? `\nIP ${s.ip}` : ""}`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function deliver(s: Submission): Promise<{ delivered: boolean; persisted: boolean }> {
  // Always emit a structured log line — the operator can scrape these later.
  console.log("[submission]", JSON.stringify(s));
  const [delivered, persisted] = await Promise.all([sendViaResend(s), persistToDisk(s)]);
  return { delivered, persisted };
}
