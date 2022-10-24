import { Awaitable } from ".";
import { Session } from "../contexts/types";

export interface DefaultJWT extends Session {
  sub?: string;
}

/**
 * Returned by the `jwt` callback and `getToken`, when using JWT sessions
 *
 * [`jwt` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) | [`getToken`](https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken)
 */
export interface JWT extends Record<string, unknown>, DefaultJWT {}

export interface JWTEncodeParams {
  /** The JWT payload. */
  token?: JWT;
  /** The secret used to encode the issued JWT. */
  secret: string | Buffer;
  /**
   * The maximum age of the issued JWT in seconds.
   * @default 7 * 24 * 30 * 60 // 7 days
   */
  maxAge?: number;
}

export interface JWTDecodeParams {
  /** The issued JWT to be decoded */
  token?: string;
  /** The secret used to decode the issued JWT. */
  secret: string | Buffer;
}

export interface JWTOptions {
  /**
   * The secret used to encode/decode the issued JWT.
   * @deprecated  Set the `NEXTAUTH_SECRET` environment vairable or
   * use the top-level `secret` option instead
   */
  secret: string;
  /**
   * The maximum age of the issued JWT in seconds.
   * @default 30 * 24 * 30 * 60 // 30 days
   */
  maxAge: number;
  /** Override this method to control the issued JWT encoding. */
  encode: (params: JWTEncodeParams) => Awaitable<string>;
  /** Override this method to control the issued JWT decoding. */
  decode: (params: JWTDecodeParams) => Awaitable<JWT | null>;
}

export type Secret = string | Buffer;
