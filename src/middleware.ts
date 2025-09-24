// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken"); // your cookie name
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/dashboard")) {
    if (!refreshToken) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
