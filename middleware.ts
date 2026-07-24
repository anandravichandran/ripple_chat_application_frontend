import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = new Set(["/", "/login", "/register", "/forgot-password", "/reset-password", "/verify-email"])
const authRoutes = new Set(["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("ripple.token")?.value ?? request.cookies.get("ripple.auth")?.value

  const isPublic = publicRoutes.has(pathname) || pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/unauthorized")
  const isAuthPage = authRoutes.has(pathname)

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!token && !isPublic) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
