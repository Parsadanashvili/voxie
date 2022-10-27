import React, { createContext, ReactNode, useMemo } from "react";
import useSession from "@hooks/useSession";
import { SessionContextValue } from "../types";
import {} from "react";

export const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export type SessionProviderValue = {
  children: ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderValue) => {
  const { session, loading, setSession } = useSession();

  const value: any = useMemo(
    () => ({
      data: session,
      status: loading
        ? "loading"
        : session
        ? "authenticated"
        : "unauthenticated",
      loadSession: setSession,
    }),
    [session, loading]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
