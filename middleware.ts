// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let route = request.url.split("/").slice(-1)[0];

  if (!route) {
    // return NextResponse.redirect(new URL("/login", request.url));
  }
}
