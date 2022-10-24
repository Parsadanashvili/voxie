import { MiddlewareOptions } from "./types/middlewareProps";
import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import { JWT } from "./types";
import { getToken } from "./utils/jwt-token";

type NextMiddlewareResult = ReturnType<NextMiddleware> | void; // eslint-disable-line @typescript-eslint/no-invalid-void-type

async function handleMiddleware(
  req: NextRequest,
  options: MiddlewareOptions | undefined,
  onSuccess?: (token: JWT | null) => Promise<NextMiddlewareResult>
) {
  const { pathname, origin, basePath } = req.nextUrl;
  const loginPage = options?.pages?.login ?? "/login";
  const registerPage = options?.pages?.register ?? "/register";
  const publicPaths = ["/_next", "/favicon.ico"];

  if (
    [loginPage, registerPage].includes(pathname) ||
    pathname.startsWith("/api") ||
    publicPaths.some((p) => pathname.startsWith(p))
  ) {
    return;
  }
  const secret = options?.secret ?? process.env.NEXT_PUBLIC_JWT_SECRET;
  if (!secret) {
    console.error(`[error][NO_JWT_SECRET]`);
    const errorUrl = new URL(`/login`, origin);
    return NextResponse.redirect(errorUrl);
  }
  const token = await getToken({
    req,
    decode: options?.jwt?.decode,
    cookieName: options?.cookieName,
    secret,
  });

  const isAuthorized =
    (await options?.callbacks?.authorized?.({ req, token })) ?? !!token;
  // the user is not logged in, redirect to the sign-in page

  if (!isAuthorized) {
    const signInUrl = new URL(`${basePath}${loginPage}`, origin);
    return NextResponse.redirect(signInUrl);
  }
  return;
}

export default handleMiddleware;
