import { NextResponse } from "next/server";
import { deliver } from "@/lib/mailer";
import { checkRate, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (!checkRate(`contact:${ip}`, { capacity: 3, refillPerMinute: 1 })) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }
  try {
    const body = await request.json();
    const { name, email, message } = body ?? {};
    if (
      typeof name !== "string" || name.trim().length < 1 || name.length > 200 ||
      typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200 ||
      typeof message !== "string" || message.trim().length < 1 || message.length > 5000
    ) {
      return NextResponse.json({ ok: false, error: "Missing or invalid fields." }, { status: 400 });
    }
    await deliver({
      kind: "contact",
      payload: body,
      receivedAt: new Date().toISOString(),
      ip,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
