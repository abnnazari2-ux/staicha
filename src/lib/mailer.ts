/**
 * mailer.ts — Sends form submissions.
 *
 * Order of preference:
 *   1. If RESEND_API_KEY is set, send via Resend.
 *   2. If a writable filesystem is available, append a JSON line.
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

// One-time warnings, surfaced when the operator hits a misconfiguration.
const warned = new Set<string>();
function warnOnce(key: string, message: string) {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(`[mailer] ${message}`);
}

async function persistToDisk(s: Submission): Promise<boolean> {
  try {
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
    const file = path.join(SUBMISSIONS_DIR, `${s.kind}.jsonl`);
    await fs.appendFile(file, JSON.stringify(s) + "\n", "utf8");
    return true;
  } catch (err) {
    warnOnce(
      "disk",
      `Could not persist submission to ${SUBMISSIONS_DIR}: ${err instanceof Error ? err.message : "unknown"}. ` +
        `Submissions will only appear in the structured log.`
    );
    return false;
  }
}

async function sendViaResend(s: Submission): Promise<{ delivered: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { delivered: false, reason: "no_api_key" };

  if (!process.env.MAIL_FROM) {
    warnOnce(
      "mail_from",
      `RESEND_API_KEY is set but MAIL_FROM is not. Falling back to noreply@${new URL(site.url).hostname} — ` +
        `Resend will reject this unless the domain is verified. Set MAIL_FROM to a verified sender address.`
    );
  }

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
    if (res.ok) return { delivered: true };
    // Surface the API error body so the operator can diagnose.
    const body = await res.text().catch(() => "");
    warnOnce(
      `resend_${res.status}`,
      `Resend rejected the message (status ${res.status}): ${body.slice(0, 240)}`
    );
    return { delivered: false, reason: `resend_${res.status}` };
  } catch (err) {
    warnOnce(
      "resend_network",
      `Resend request failed: ${err instanceof Error ? err.message : "network error"}`
    );
    return { delivered: false, reason: "network" };
  }
}

export async function deliver(s: Submission): Promise<{ delivered: boolean; persisted: boolean }> {
  // Structured log line — the operator can scrape these later.
  console.log("[submission]", JSON.stringify(s));
  const [sendResult, persisted] = await Promise.all([sendViaResend(s), persistToDisk(s)]);
  return { delivered: sendResult.delivered, persisted };
}
