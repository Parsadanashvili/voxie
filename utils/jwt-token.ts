import cookie from "@utils/cookie";
import * as jose from "jose";
import { JWT, JWTEncodeParams, JWTDecodeParams } from "../types";
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

export async function getToken(cookieName = "session", req?: any) {
  let cookies;

  if (req && req.cookies) {
    if (typeof req.cookies?.get == "function") {
      cookies = req.cookies?.get(cookieName);
    } else {
      cookies = req.cookies[cookieName];
    }
  } else {
    cookies = cookie.parse(document.cookie)[cookieName];
  }

  const session = await decode({
    token: cookies,
    secret: process.env.NEXT_PUBLIC_JWT_SECRET as string,
  });

  return session;
}

export async function setToken(data: any, cookieName = "session", req?: any) {
  let encodedData = await encode({
    token: data,
    secret: process.env.NEXT_PUBLIC_JWT_SECRET as string,
  });

  cookie.setCookie(cookieName, encodedData);
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
