// @ts-expect-error
import { getCookie } from "cookies-next";
import * as jose from "jose";
import { JWTEncodeParams, JWTDecodeParams } from "./../types/jwtProps";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { JWT, JWTOptions } from "../types";
import hkdf from "@panva/hkdf";

const DEFAULT_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

const now = () => (Date.now() / 1000) | 0;

export async function encode(params: JWTEncodeParams) {
  const { token = {}, secret, maxAge = DEFAULT_MAX_AGE } = params;

  const encryptionSecret = await getDerivedEncryptionKey(secret);

  return await new jose.EncryptJWT(token)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(now() + maxAge)
    .encrypt(encryptionSecret);
}

export async function decode(params: JWTDecodeParams): Promise<JWT | null> {
  const { token, secret } = params;
  if (!token) return null;
  const encryptionSecret = await getDerivedEncryptionKey(secret);
  const { payload } = await jose.jwtDecrypt(token, encryptionSecret, {
    clockTolerance: 15,
  });
  return payload;
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

  let token = getCookie(cookieName, { req });

  console.log(req.cookies);

  // let token = JSON.parse(cookie);

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

async function getDerivedEncryptionKey(secret: string | Buffer) {
  return await hkdf(
    "sha256",
    secret,
    "",
    "NextAuth.js Generated Encryption Key",
    32
  );
}
