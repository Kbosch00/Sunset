import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasAccess = request.cookies.get("sunset_access")?.value === "1";
  const saidYes = request.cookies.get("sunset_said_yes")?.value === "1";

  // ——— /login ———
  if (pathname.startsWith("/login")) {
    if (hasAccess) {
      // Ya puso la contraseña en esta sesión
      if (saidYes) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.redirect(new URL("/ask", request.url));
    }
    return NextResponse.next();
  }

  // ——— Sin acceso en esta sesión → siempre login ———
  if (!hasAccess) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ——— Tiene acceso en esta sesión ———
  if (!saidYes) {
    // Todavía no ha respondido → solo puede estar en /ask
    if (!pathname.startsWith("/ask")) {
      return NextResponse.redirect(new URL("/ask", request.url));
    }
    return NextResponse.next();
  }

  // ——— Ya dijo Sí ———
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
