import React, { useState } from "react";
import Card from "@components/Card";
import AvatarStep from "views/Complete/AvatarStep";
import UsernameStep from "views/Complete/UsernameStep";
import { CustomNextPage } from "../../types/page";
import styles from "@styles/Auth.module.css";
import WaitingStep from "views/Complete/WaitingStep";

const steps = [UsernameStep, AvatarStep, WaitingStep];

const Register: CustomNextPage = () => {
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

Register.getPageTitle = "Register";

export default Register;
