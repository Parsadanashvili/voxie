import { getToken } from "@utils/jwt-token";
import { NextRequest, NextResponse } from "next/server";

const guestRoutes = ["/auth"];

const guardedRoutes = ["/rooms/*", "/auth/complete"];

const handle = async (req: NextRequest) => {
  const token = await getToken("session", req);

  if (
    !req.nextUrl.pathname.startsWith("/api") &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    if (token && guestRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      token &&
      !token?.user?.username &&
      !req.nextUrl.pathname.startsWith("/auth/complete")
    ) {
      return NextResponse.redirect(new URL("/auth/complete", req.url));
    }

    if (
      token &&
      token?.user?.username &&
      req.nextUrl.pathname.startsWith("/auth/complete")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!token && guardedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
};

export default handle;
