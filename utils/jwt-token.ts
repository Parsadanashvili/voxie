import { getCookie } from "cookies-next";
const jwt = require("jsonwebtoken");
import { JWTEncodeParams, JWTDecodeParams } from "./../types/jwtProps";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { JWT, JWTOptions } from "../types";

const DEFAULT_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

const now = () => (Date.now() / 1000) | 0;

export async function encode(params: JWTEncodeParams) {
  const { token = {}, secret, maxAge = DEFAULT_MAX_AGE } = params;

  return jwt.sign(token, secret, {
    expiresIn: now() + maxAge,
  });
}

export async function decode(params: JWTDecodeParams): Promise<JWT | null> {
  const { token, secret } = params;
  if (!token) return null;

  return jwt.verify(token, secret);
}

export interface GetTokenParams<R extends boolean = false> {
  req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest;

  secureCookie?: boolean;

  cookieName?: string;

  raw?: R;

  secret?: string;

  decode?: JWTOptions["decode"];
}

export async function getToken<R extends boolean = false>(
  params: GetTokenParams<R>
): Promise<R extends true ? string : JWT | null> {
  const {
    req,
    secureCookie = !!process.env.VERCEL,
    cookieName = secureCookie ? "session" : "session",
    raw,
    decode: _decode = decode,
    secret = process.env.NEXT_PUBLIC_JWT_SECRET,
  } = params;

  if (!req) throw new Error("Must pass `req` to JWT getToken()");

  let token = JSON.parse(getCookie(cookieName) as string);

  const authorizationHeader =
    req.headers instanceof Headers
      ? req.headers.get("authorization")
      : req.headers.authorization;

  if (!token && authorizationHeader?.split(" ")[0] === "Bearer") {
    const urlEncodedToken = authorizationHeader.split(" ")[1];
    token = decodeURIComponent(urlEncodedToken);
  }

  // @ts-expect-error
  if (!token) return null;

  if (raw) return token;

  try {
    // @ts-expect-error
    return await _decode({ token, secret });
  } catch {
    // @ts-expect-error
    return null;
  }
}
