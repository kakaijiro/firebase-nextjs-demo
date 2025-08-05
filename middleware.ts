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

  // if have not logged in yet
  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  )
    return NextResponse.next();

  // if already logged in
  if (
    token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
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
        `/api/refresh-token?redirect=${encodeURIComponent(
          request.nextUrl.pathname
        )}`,
        request.url
      )
    );
  }

  if (!decodedToken.admin)
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
  ],
};
