import React, { useState } from "react";
import Card from "@components/Card";
import AvatarStep from "views/Complete/AvatarStep";
import UsernameStep from "views/Complete/UsernameStep";
import styles from "@styles/Auth.module.css";
import WaitingStep from "views/Complete/WaitingStep";

const steps = [UsernameStep, AvatarStep, WaitingStep];

const Complete = () => {
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

export default Complete;
