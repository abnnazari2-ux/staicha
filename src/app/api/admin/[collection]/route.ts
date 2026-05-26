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
  if (!user || !pass) return true; // dev mode
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return false;
  const [u, p] = Buffer.from(auth.slice(6), "base64").toString("utf8").split(":");
  return u === user && p === pass;
}

// After a successful write, drop the static cache for every route that
// consumes the changed collection so editors see their work without a redeploy.
function revalidateFor(collection: Collection) {
  switch (collection) {
    case "services":
      revalidatePath("/services");
      revalidatePath("/services/[slug]", "page");
      revalidatePath("/", "layout"); // footer + homepage showcase
      return;
    case "team":
      revalidatePath("/team");
      revalidatePath("/insights/[slug]", "page"); // author byline
      return;
    case "testimonials":
      revalidatePath("/");
      return;
    case "insights":
      revalidatePath("/insights");
      revalidatePath("/insights/[slug]", "page");
      revalidatePath("/");
      return;
    case "careers":
      revalidatePath("/careers");
      return;
  }
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
    if (result.persisted) revalidateFor(params.collection);
    return NextResponse.json(result, { status: result.persisted ? 200 : 503 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Invalid request." },
      { status: 400 }
    );
  }
}
