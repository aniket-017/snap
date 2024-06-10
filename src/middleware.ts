import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup" || path === "/" || path === "/admin/login" || path=== "/pricing" ;

  const internal_token = request.cookies.get("internal_token")?.value || "";
  const external_token = request.cookies.get("external_token")?.value || "";
  const admin_token = request.cookies.get("admin_token")?.value || "";

  const internalPaths = ["/internal", "/internal/dashboard","/internal/createorder","/internal/trackorder","/internal/settings"];
  const externalPaths = ["/external", "/external/dashboard","/external/createorder","/external/trackorder","/external/settings"];
  const adminPaths = ["/admin/dashboard","/admin/users","/admin/external","/admin/plans","/admin/settings", "/admin/customers"]; 

  if (internal_token && !internalPaths.includes(path) && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (external_token && !externalPaths.includes(path) && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (admin_token && !adminPaths.includes(path) && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && (!internal_token && !external_token && !admin_token)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (internal_token && path === "/login") {
    return NextResponse.redirect(
      new URL(`/internal/dashboard?${internal_token}`, request.nextUrl)
    );
  }

  if (external_token && path === "/login") {
    return NextResponse.redirect(
      new URL(`/external/dashboard?${external_token}`, request.nextUrl)
    );
  }
  if (admin_token && path === "/login") {
    return NextResponse.redirect(
      new URL(`/admin/dashboard?${admin_token}`, request.nextUrl)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/internal/:path*", "/external/:path*","/admin/:path*"],
};
