/**
 * rateLimit.ts — In-memory token bucket per IP. Resets on process restart.
 * Good enough to stop accidental loops; not a substitute for a real WAF.
 */

type Bucket = { tokens: number; updatedAt: number };
const buckets = new Map<string, Bucket>();

export function checkRate(key: string, opts: { capacity: number; refillPerMinute: number }): boolean {
  const now = Date.now();
  const refillPerMs = opts.refillPerMinute / 60_000;
  const bucket = buckets.get(key) ?? { tokens: opts.capacity, updatedAt: now };
  // Refill since last hit, capped at capacity.
  const elapsed = now - bucket.updatedAt;
  bucket.tokens = Math.min(opts.capacity, bucket.tokens + elapsed * refillPerMs);
  bucket.updatedAt = now;
  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    return false;
  }
  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return true;
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    "anon"
  );
}
