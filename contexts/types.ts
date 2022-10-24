export interface DefaultSession {
  user?: {
    id?: number | null;
    username?: string | null;
    email?: string | null;
    avatar?: string | null;
  };
  accessToken?: string;
  expiresAt?: string;
}

export interface Session extends DefaultSession {}

export interface SessionProviderProps {
  children: React.ReactNode;
  refetchOnWindowFocus?: boolean;
}

export type SessionContextValue<R extends boolean = false> = R extends true
  ?
      | { data: Session; status: "authenticated" }
      | { data: null; status: "loading" }
  :
      | { data: Session; status: "authenticated" }
      | { data: null; status: "unauthenticated" | "loading" };
