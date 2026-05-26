/**
 * cms.ts — Minimal read/write layer for site content.
 *
 * Reads return the typed content from `src/content/*.ts`. Writes attempt to
 * persist an override JSON file to `content-overrides/<key>.json` on the
 * server's filesystem. This works on Replit Reserved VM, Render disks, or
 * any long-running Node host with a writable filesystem. On serverless
 * platforms (Vercel, Cloudflare Workers) the write is a no-op — the admin
 * UI will warn the editor and content should be edited in the typed
 * source files instead.
 *
 * NOTE: at runtime, overrides take precedence over the typed defaults so
 * that an editor's changes appear on the live site without a redeploy.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { services as defaultServices } from "@/content/services";
import { team as defaultTeam } from "@/content/team";
import { testimonials as defaultTestimonials } from "@/content/testimonials";
import { insights as defaultInsights } from "@/content/insights";
import { positions as defaultPositions } from "@/content/careers";

export type Collection =
  | "services"
  | "team"
  | "testimonials"
  | "insights"
  | "careers";

const DEFAULTS: Record<Collection, unknown> = {
  services: defaultServices,
  team: defaultTeam,
  testimonials: defaultTestimonials,
  insights: defaultInsights,
  careers: defaultPositions,
};

const OVERRIDES_DIR = path.join(process.cwd(), "content-overrides");

async function readOverride<T>(key: Collection): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(OVERRIDES_DIR, `${key}.json`), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function readCollection<T>(key: Collection): Promise<T> {
  const override = await readOverride<T>(key);
  return (override ?? (DEFAULTS[key] as T));
}

export async function writeCollection<T>(key: Collection, data: T): Promise<{ ok: boolean; persisted: boolean; error?: string }> {
  try {
    await fs.mkdir(OVERRIDES_DIR, { recursive: true });
    await fs.writeFile(
      path.join(OVERRIDES_DIR, `${key}.json`),
      JSON.stringify(data, null, 2),
      "utf8"
    );
    return { ok: true, persisted: true };
  } catch (err) {
    // Read-only filesystem (serverless) — return clear signal to the admin UI.
    return {
      ok: false,
      persisted: false,
      error: err instanceof Error ? err.message : "Filesystem not writable in this environment.",
    };
  }
}
