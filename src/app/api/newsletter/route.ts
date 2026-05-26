import { NextResponse } from "next/server";
import { deliver } from "@/lib/mailer";
import { checkRate, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (!checkRate(`newsletter:${ip}`, { capacity: 2, refillPerMinute: 1 })) {
    return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
  }
  try {
    const { email } = await request.json();
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }
    await deliver({
      kind: "newsletter",
      payload: { email },
      receivedAt: new Date().toISOString(),
      ip,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
