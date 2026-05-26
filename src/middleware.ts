import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USERNAME;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return NextResponse.next();

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
