import { SessionContext } from "@contexts/SessionContext";
import useSession from "@hooks/useSession";
import { ReactNode, useMemo } from "react";

export type SessionProviderValue = {
  children: ReactNode;
};

const SessionProvider = ({ children }: SessionProviderValue) => {
  const { session, loading, setSession } = useSession();

  const value: any = useMemo(
    () => ({
      data: session || {},
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

export default SessionProvider;
