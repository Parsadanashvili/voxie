import { getToken } from "@utils/jwt-token";
import { NextRequest, NextResponse } from "next/server";

const guardedRoutes = ["/api/auth", "/api/auth/verify", "/auth"];

const guestRoutes = ["/rooms/*"];

const handle = async (req: NextRequest) => {
  const token = await getToken("session", req);

  if (token && guardedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && guestRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
};

export default handle;
