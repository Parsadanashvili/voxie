import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "@styles/Auth.module.css";
import Spinner from "@components/Spinner";
import { getToken, setToken } from "@utils/jwt-token";

interface Props {
  onNext: (data?: any) => void | {};
  stepData: { [key: string]: string };
}

const WaitingStep = ({ stepData }: Props) => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = await getToken();

      if (token && token.user) {
        token.user.username = stepData.username;

        if (stepData.avatar) {
          token.user.avatar = stepData.avatar;
        }

        await setToken(token);
      }

      setTimeout(() => {
        router.reload();
      }, 2000);
    })();
  }, []);

  return (
    <>
      <h2>Registration in progress...</h2>

      <div className={styles.info}>
        <Spinner size="lg" color="primary" />
      </div>
    </>
  );
};

export default WaitingStep;
