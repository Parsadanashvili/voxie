import React, { useState } from "react";
import Card from "../../components/Card";
import EmailStep from "../../components/Login/EmailStep";
import OTPStep from "../../components/Login/OTPStep";
import { CustomNextPage } from "../../types/page";
import styles from "../../styles/Auth.module.css";

const steps = [EmailStep, OTPStep];

const Login: CustomNextPage = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const Step = steps[step];

  const handleNext = async (data: { [key: string]: string }) => {
    setData((prevData) => ({
      ...prevData,
      ...data,
    }));
    setStep((prev) => prev + 1);
  };

  return (
    <main className={styles.wrapper}>
      <Card width={400}>
        <div className={styles.box}>
          <Step onNext={handleNext} stepData={data} />
        </div>
      </Card>
    </main>
  );
};

Login.getPageTitle = "Login";

export default Login;
