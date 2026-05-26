import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USERNAME;
  const pass = process.env.ADMIN_PASSWORD;
  // If admin creds are not set, only let through when the operator
  // explicitly opted in with DEV_ALLOW_OPEN_ADMIN=true. Otherwise lock the
  // route — a missing-env-vars deploy must not expose /admin.
  if (!user || !pass) {
    if (process.env.DEV_ALLOW_OPEN_ADMIN === "true") return NextResponse.next();
    return new NextResponse("Admin disabled: ADMIN_USERNAME/ADMIN_PASSWORD not set.", { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, value] = auth.split(" ");
    if (scheme === "Basic") {
      const decoded = Buffer.from(value, "base64").toString("utf8");
      const [u, p] = decoded.split(":");
      if (u === user && p === pass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Staicha Admin"' },
  });
}
