import React, { useState } from "react";
import Card from "../../components/Card";
import EmailStep from "../../components/Login/EmailStep";
import OTPStep from "../../components/Login/OTPStep";
import { CustomNextPage } from "../../types/pageProps";
import styles from "../../styles/Auth.module.css";

const steps = [EmailStep, OTPStep];

const Login: CustomNextPage = () => {
  const [step, setStep] = useState(0);
  const Step = steps[step];

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <main className={styles.wrapper}>
      <Card width={400}>
        <div className={styles.box}>
          <Step onNext={handleNext} />
        </div>
      </Card>
    </main>
  );
};

Login.getPageTitle = "Login";

export default Login;
