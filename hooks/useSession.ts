import axios from "axios";
import { useEffect, useState } from "react";
import { Session } from "../types";
import { getToken, setToken } from "@utils/jwt-token";

const useSession = () => {
  const [session, setSession] = useState<Session | undefined>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSession = async () => {
      const token = await getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      await axios
        .get("/api/user", {
          headers: {
            authorization: token?.accessToken,
          },
        })
        .then((res) => {
          setSession(res.data);

          setToken(res.data);
        })
        .catch(() => {
          setLoading(false);
        });
    };

    getSession();
  }, []);

  useEffect(() => {
    if (session) {
      setLoading(false);
    }
  }, [session]);

  return { session, loading, setSession };
};

export default useSession;
