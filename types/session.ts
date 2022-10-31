import User from "./user";

export interface DefaultSession {
  user?: User;
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
