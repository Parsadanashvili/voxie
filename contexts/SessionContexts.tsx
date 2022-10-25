import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Session, SessionContextValue } from "../types";
import { getToken } from "../utils/jwt-token";

export const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export type SessionProviderValue = {
  children: ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderValue) => {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      await axios
        .get("/api/user", {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          setSession(res.data);
          setLoading(false);
        });
    };

    getSession();
  }, []);

  const value: any = useMemo(
    () => ({
      data: session,
      status: loading
        ? "loading"
        : session
        ? "authenticated"
        : "unauthenticated",
    }),
    [session, loading]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
