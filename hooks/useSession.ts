import axios from "axios";
import { useEffect, useState } from "react";
import { Session } from "../types";
import { getToken } from "../utils/jwt-token";

const useSession = () => {
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

  return { session, loading };
};

export default useSession;
