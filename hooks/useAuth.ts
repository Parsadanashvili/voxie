import axios from "axios";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContexts";
import { SessionContextValue } from "../types";
import cookie from "@utils/cookie";
import { setToken } from "@utils/jwt-token";

const useAuth = <R extends boolean>() => {
  // @ts-expect-error Satisfy TS if branch on line below
  const {
    data: session,
    status,
    loadSession,
  }: SessionContextValue<R> = useContext(SessionContext);

  const auth = async (payload: { email: string }) => {
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
      .then(async (res) => {
        loadSession(res.data);
        await setToken(res.data);

        return res;
      });
  };
  const logout = () => {
    cookie.deleteCookie("session");

    loadSession(undefined);
  };

  return {
    auth,
    verifyOTP,
    logout,
    ...session,
    status,
  };
};

export default useAuth;
