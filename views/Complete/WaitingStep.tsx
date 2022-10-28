import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "@styles/Auth.module.css";
import Spinner from "@components/Spinner";

const WaitingStep = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
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
