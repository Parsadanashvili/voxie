import { NextPage } from "next";
import Head from "next/head";
import React, { ReactElement, useState } from "react";
import Card from "../../components/Card";
import EmailStep from "../../components/Registration/EmailStep";
import OTPStep from "../../components/Registration/OTPStep";
import styles from "../../styles/Auth.module.css";

const steps = [EmailStep, OTPStep];

const Register: NextPage = () => {
  const [step, setStep] = useState(0);
  const Step = steps[step];

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <main className={styles.wrapper}>
      <Head>
        <title>Register</title>
      </Head>

      <Card width={400}>
        <div className={styles.box}>
          <h2>Registration</h2>

          <Step onNext={handleNext} />
        </div>
      </Card>
    </main>
  );
};

export default Register;
