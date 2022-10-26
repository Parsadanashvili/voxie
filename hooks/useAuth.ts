import axios from "axios";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContexts";
import { SessionContextValue } from "../types";
import cookie from "@utils/cookie";

const useAuth = <R extends boolean>() => {
  // @ts-expect-error Satisfy TS if branch on line below
  const {
    data: session,
    status,
    loadSession,
  }: SessionContextValue<R> = useContext(SessionContext);

  const login = async (payload: { email: string }) => {
    return await axios
      .post("/api/auth", {
        email: payload.email,
      })
      .then((res) => {
        return res;
      });
  };
  const verifyOTP = async (payload: { email: string; otp: string }) => {
    return await axios
      .post("/api/auth/verify", {
        email: payload.email,
        otp: payload.otp,
      })
      .then((res) => {
        loadSession("testtt" as any);

        const session = JSON.stringify({ accessToken: res.data.accessToken });

        cookie.setCookie("session", session);

        return res;
      });
  };
  const register = () => {};
  const logout = () => {};

  return {
    login,
    verifyOTP,
    register,
    logout,
    ...session,
    status,
  };
};

export default useAuth;
