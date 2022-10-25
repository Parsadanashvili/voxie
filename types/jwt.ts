import { Awaitable, Session } from ".";

export interface DefaultJWT extends Session {
  sub?: string;
  exp?: number;
}

export interface JWT extends Record<string, unknown>, DefaultJWT {}

export interface JWTEncodeParams {
  token?: JWT;

  secret: string | Buffer;

  maxAge?: number;
}

export interface JWTDecodeParams {
  token?: string;

  secret: string | Buffer;
}

export interface JWTOptions {
  secret: string;

  maxAge: number;

  encode: (params: JWTEncodeParams) => Awaitable<string>;

  decode: (params: JWTDecodeParams) => Awaitable<JWT | null>;
}

export type Secret = string | Buffer;
