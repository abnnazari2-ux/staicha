import { NextResponse, type NextRequest } from "next/server";
import { readCollection, writeCollection, type Collection } from "@/lib/cms";

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

export async function GET(req: NextRequest, { params }: { params: { collection: string } }) {
  if (!authorised(req)) return new NextResponse("Unauthorized", { status: 401 });
  if (!isValid(params.collection)) return NextResponse.json({ ok: false, error: "Unknown collection." }, { status: 404 });
  const data = await readCollection(params.collection);
  return NextResponse.json({ ok: true, data });
}

export async function PUT(req: NextRequest, { params }: { params: { collection: string } }) {
  if (!authorised(req)) return new NextResponse("Unauthorized", { status: 401 });
  if (!isValid(params.collection)) return NextResponse.json({ ok: false, error: "Unknown collection." }, { status: 404 });
  try {
    const body = await req.json();
    const result = await writeCollection(params.collection, body);
    return NextResponse.json(result, { status: result.persisted ? 200 : 503 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Invalid request." },
      { status: 400 }
    );
  }
}
