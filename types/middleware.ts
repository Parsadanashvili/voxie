import { JWTOptions } from "./jwt";
import { NextRequest } from "next/server";
import { Awaitable } from ".";
import { JWT } from ".";

type AuthorizedCallback = (params: {
  token: JWT | null;
  req: NextRequest;
}) => Awaitable<boolean>;

export interface MiddlewareOptions {
  pages?: Partial<{
    login: string;
    register: string;
  }>;

  jwt?: Partial<Pick<JWTOptions, "decode">>;

  cookieName?: string;

  callbacks?: Partial<{
    [key: string]: (params: {
      req: NextRequest;
      token: JWT | null;
    }) => {} | void;
  }>;

  /**
   * The same `secret` used in the configuration.
   * Defaults to the `NEXT_PUBLIC_JWT_SECRET` environment variable.
   */
  secret?: string;
}
