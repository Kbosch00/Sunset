import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccess = request.cookies.get("sunset_access")?.value === "1";
  const saidYes = request.cookies.get("sunset_said_yes")?.value === "1";

  if (pathname.startsWith("/login")) {
    if (hasAccess) {
      if (saidYes) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.redirect(new URL("/ask", request.url));
    }
    return NextResponse.next();
  }
  if (!hasAccess) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!saidYes) {
    if (!pathname.startsWith("/ask")) {
      return NextResponse.redirect(new URL("/ask", request.url));
    }
    return NextResponse.next();
  }
  if (pathname.startsWith("/ask")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
