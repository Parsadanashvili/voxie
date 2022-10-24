import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { Session, SessionContextValue, SessionProviderProps } from "./types";

export const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export const useSession = <R extends boolean>(options?: any) => {
  const router = useRouter();

  // @ts-expect-error Satisfy TS if branch on line below
  const value: SessionContextValue<R> = React.useContext(SessionContext);
  if (!value && process.env.NODE_ENV !== "production") {
    throw new Error("`useSession` must be wrapped in a <SessionProvider />");
  }

  const { required, onUnauthenticated } = options ?? {};

  const requiredAndNotLoading = required && value.status === "unauthenticated";

  useEffect(() => {
    if (requiredAndNotLoading) {
      const url = `/login`;
      if (onUnauthenticated) onUnauthenticated();
      else router.push(url);
    }
  }, [requiredAndNotLoading, onUnauthenticated]);

  if (requiredAndNotLoading) {
    return { data: value.data, status: "loading" } as const;
  }

  return value;
};

export const SessionProvider = ({
  children,
  refetchOnWindowFocus,
}: SessionProviderProps) => {
  const [session, setSession] = useState<Session>();

  const [loading, setLoading] = useState<boolean>(true);

  const _getSession = async () => {
    try {
      let accessToken =
        JSON.parse(getCookie("session") as string)?.accessToken ?? "";

      const response = await axios
        .post(
          "/api/user",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data);

      setSession(response);
    } catch (error) {
      console.log("Client session error: ", error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _getSession();
  }, []);

  useEffect(() => {
    const visibilityHandler = () => {
      if (refetchOnWindowFocus && document.visibilityState === "visible") {
        _getSession();
      }
    };

    document.addEventListener("visibilitychange", visibilityHandler, false);

    return () =>
      document.removeEventListener(
        "visibilitychange",
        visibilityHandler,
        false
      );
  }, [refetchOnWindowFocus]);

  const value: any = React.useMemo(
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
