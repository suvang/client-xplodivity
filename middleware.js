import { NextResponse } from "next/server";

export function middleware(request) {
  let token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }
}
