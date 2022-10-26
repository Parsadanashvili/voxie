import React, { createContext, ReactNode, useMemo, useState } from "react";
import useSession from "@hooks/useSession";
import { Session, SessionContextValue } from "../types";
import { useEffect } from "react";

export const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export type SessionProviderValue = {
  children: ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderValue) => {
  const { session: data, loading } = useSession();
  const [session, setSession] = useState<Session | undefined>();

  useEffect(() => {
    setSession(data);
  }, [session, loading]);

  const loadSession = (payload: any) => {
    console.log(payload);

    setSession(payload);
  };

  const value: any = useMemo(
    () => ({
      data: session,
      status: loading
        ? "loading"
        : session
        ? "authenticated"
        : "unauthenticated",
      loadSession,
    }),
    [session, loading]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
