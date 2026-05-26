import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { readCollection, writeCollection, type Collection } from "@/lib/cms";
import { checkRate, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const VALID: Collection[] = ["services", "team", "testimonials", "insights", "careers"];

function isValid(c: string): c is Collection {
  return (VALID as string[]).includes(c);
}

function authorised(req: NextRequest): boolean {
  const user = process.env.ADMIN_USERNAME;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) {
    // No credentials configured: only allow the API to be called when the
    // operator explicitly opted in via DEV_ALLOW_OPEN_ADMIN. This protects
    // accidental deploys without admin secrets set.
    return process.env.DEV_ALLOW_OPEN_ADMIN === "true";
  }
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return false;
  const [u, p] = Buffer.from(auth.slice(6), "base64").toString("utf8").split(":");
  return u === user && p === pass;
}

// After a successful write, drop the static cache for every route that
// consumes the changed collection so editors see their work without a redeploy.
function revalidateFor(collection: Collection): string[] {
  const touched: string[] = [];
  const hit = (path: string, type?: "page" | "layout") => {
    revalidatePath(path, type);
    touched.push(type ? `${path} (${type})` : path);
  };
  switch (collection) {
    case "services":
      hit("/", "layout"); // footer + homepage showcase
      hit("/services");
      hit("/services/[slug]", "page");
      break;
    case "team":
      hit("/team");
      hit("/insights/[slug]", "page"); // author byline
      break;
    case "testimonials":
      hit("/");
      break;
    case "insights":
      hit("/");
      hit("/insights");
      hit("/insights/[slug]", "page");
      break;
    case "careers":
      hit("/careers");
      break;
  }
  return touched;
}

export async function GET(req: NextRequest, { params }: { params: { collection: string } }) {
  if (!authorised(req)) return new NextResponse("Unauthorized", { status: 401 });
  if (!isValid(params.collection)) return NextResponse.json({ ok: false, error: "Unknown collection." }, { status: 404 });
  const data = await readCollection(params.collection);
  return NextResponse.json({ ok: true, data });
}

export async function PUT(req: NextRequest, { params }: { params: { collection: string } }) {
  if (!authorised(req)) return new NextResponse("Unauthorized", { status: 401 });
  if (!isValid(params.collection)) return NextResponse.json({ ok: false, error: "Unknown collection." }, { status: 404 });
  if (!checkRate(`admin:${getClientIp(req.headers)}`, { capacity: 20, refillPerMinute: 10 })) {
    return NextResponse.json({ ok: false, error: "Too many writes." }, { status: 429 });
  }
  try {
    const body = await req.json();
    const result = await writeCollection(params.collection, body);
    let revalidated: string[] = [];
    if (result.persisted) revalidated = revalidateFor(params.collection);
    return NextResponse.json(
      { ...result, revalidated },
      { status: result.persisted ? 200 : 503 }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Invalid request." },
      { status: 400 }
    );
  }
}
