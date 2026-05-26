/**
 * cms.ts — Read/write layer for site content.
 *
 * Reads merge a JSON override (if present) over the typed defaults from
 * `src/content/*.ts`. Writes validate against a zod schema and persist
 * to `content-overrides/<key>.json`. Pages call `readCollection` and
 * Next.js ISR (revalidate: 60) picks up changes within a minute.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import { services as defaultServices, type Service } from "@/content/services";
import { team as defaultTeam, type TeamMember } from "@/content/team";
import {
  testimonials as defaultTestimonials,
  type Testimonial,
} from "@/content/testimonials";
import { insights as defaultInsights, type Insight } from "@/content/insights";
import {
  positions as defaultPositions,
  type Position,
} from "@/content/careers";
import { SCHEMAS, type Collection } from "@/lib/schemas";

export type { Collection } from "@/lib/schemas";

type Shape = {
  services: Service[];
  team: TeamMember[];
  testimonials: Testimonial[];
  insights: Insight[];
  careers: Position[];
};

const DEFAULTS: Shape = {
  services: defaultServices,
  team: defaultTeam,
  testimonials: defaultTestimonials,
  insights: defaultInsights,
  careers: defaultPositions,
};

const OVERRIDES_DIR = path.join(process.cwd(), "content-overrides");

async function readOverride<K extends Collection>(key: K): Promise<Shape[K] | null> {
  try {
    const raw = await fs.readFile(path.join(OVERRIDES_DIR, `${key}.json`), "utf8");
    const parsed = JSON.parse(raw);
    const result = SCHEMAS[key].safeParse(parsed);
    if (!result.success) {
      console.warn(`[cms] override ${key}.json failed validation, ignoring:`, result.error.message);
      return null;
    }
    return result.data as Shape[K];
  } catch {
    return null;
  }
}

export async function readCollection<K extends Collection>(key: K): Promise<Shape[K]> {
  // Opt out of the full-route static cache: file-based overrides may change
  // between requests and Next would otherwise serve the build-time snapshot.
  noStore();
  const override = await readOverride(key);
  return override ?? DEFAULTS[key];
}

export async function writeCollection<K extends Collection>(
  key: K,
  data: unknown
): Promise<{ ok: boolean; persisted: boolean; error?: string }> {
  // Validate first — never write invalid data.
  const result = SCHEMAS[key].safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      persisted: false,
      error: `Schema validation failed: ${result.error.issues
        .slice(0, 5)
        .map((i) => `${i.path.join(".") || "root"}: ${i.message}`)
        .join("; ")}`,
    };
  }
  try {
    await fs.mkdir(OVERRIDES_DIR, { recursive: true });
    await fs.writeFile(
      path.join(OVERRIDES_DIR, `${key}.json`),
      JSON.stringify(result.data, null, 2),
      "utf8"
    );
    return { ok: true, persisted: true };
  } catch (err) {
    return {
      ok: false,
      persisted: false,
      error: err instanceof Error ? err.message : "Filesystem not writable in this environment.",
    };
  }
}
