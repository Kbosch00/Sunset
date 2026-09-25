import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/src/prisma/db";

const MAX_COOKIE_AGE = 60 * 60 * 24 * 400;

async function resolveSaidYes(request: NextRequest) {
  const fromCookie = request.cookies.get("sunset_said_yes")?.value === "1";
  if (fromCookie) return true;
  const proposal = await db.orm.public.Proposal.where({}).first();
  return proposal !== null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccess = request.cookies.get("sunset_access")?.value === "1";
  const saidYes = await resolveSaidYes(request);

  function withRefreshedCookie(response: NextResponse) {
    if (saidYes) {
      response.cookies.set("sunset_said_yes", "1", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: MAX_COOKIE_AGE,
        path: "/",
      });
    }
    return response;
  }

  if (pathname.startsWith("/login")) {
    if (hasAccess) {
      if (saidYes) {
        return withRefreshedCookie(
          NextResponse.redirect(new URL("/", request.url)),
        );
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
    return withRefreshedCookie(
      NextResponse.redirect(new URL("/", request.url)),
    );
  }

  return withRefreshedCookie(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!login|api/uploadthing|opengraph-image|robots.txt|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
