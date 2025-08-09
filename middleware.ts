import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
  console.log("Middleware", request.url);

  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  // restructure request.nextUrl.pathname
  // we can use "pathname" instead of "request.nextUrl.pathname"
  const { pathname } = request.nextUrl;

  // if have not logged in yet
  if (
    !token &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/property-search") ||
      pathname.startsWith("/forgot-password"))
  )
    return NextResponse.next();

  // if already logged in
  if (
    token &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/forgot-password"))
  )
    return NextResponse.redirect(new URL("/", request.url));

  // if token is empty
  if (!token) return NextResponse.redirect(new URL("/", request.url)); // redirect() takes an absolute path

  // if token doesn't have the custom claim "admin"
  const decodedToken = decodeJwt(token);

  // if auth token expires within 5 min, request new auth
  if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
    return NextResponse.redirect(
      new URL(
        `/api/refresh-token?redirect=${encodeURIComponent(pathname)}`,
        request.url
      )
    );
  }

  if (!decodedToken.admin && pathname.startsWith("/admin-dashboard"))
    return NextResponse.redirect(new URL("/", request.url));

  if (decodedToken.admin && pathname.startsWith("/account/my-favourites"))
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

// middleware only applies for:
export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/account",
    "/account/:path*",
    "/property-search",
  ],
};
