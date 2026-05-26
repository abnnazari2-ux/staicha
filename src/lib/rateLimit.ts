/**
 * rateLimit.ts — In-memory token bucket per IP. Resets on process restart.
 *
 * To keep memory bounded under heavy traffic, idle buckets (no hits for
 * `IDLE_MS`) are dropped on each `checkRate` call when the map crosses
 * `GC_THRESHOLD`. Good enough to stop accidental loops; not a substitute
 * for a real WAF.
 */

type Bucket = { tokens: number; updatedAt: number };
const buckets = new Map<string, Bucket>();

const IDLE_MS = 5 * 60_000;
const GC_THRESHOLD = 1000;

function maybeGC(now: number) {
  if (buckets.size < GC_THRESHOLD) return;
  for (const [k, b] of buckets) {
    if (now - b.updatedAt > IDLE_MS) buckets.delete(k);
  }
}

export function checkRate(key: string, opts: { capacity: number; refillPerMinute: number }): boolean {
  const now = Date.now();
  maybeGC(now);
  const refillPerMs = opts.refillPerMinute / 60_000;
  const bucket = buckets.get(key) ?? { tokens: opts.capacity, updatedAt: now };
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
