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
      | {
          data: Session | undefined;
          status: "authenticated";
          loadSession: (payload: any) => void;
        }
      | { data: null; status: "loading"; loadSession: (payload: any) => void }
  :
      | {
          data: Session | undefined;
          status: "authenticated";
          loadSession: (payload: any) => void;
        }
      | {
          data: null;
          status: "unauthenticated" | "loading";
          loadSession: (payload: any) => void;
        };
