import React, { FormEvent, KeyboardEvent, useMemo, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "../../components/Button";
import styles from "../../styles/Auth.module.css";
import OtpInput from "../OtpInput";

const VALUE_LENGTH = 4;

interface Props {
  onNext: () => {} | void;
}

const OTPStep = ({ onNext }: Props) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onNext();
  };

  const handleChange = (value: string) => {
    setOtp(value);
  };

  return (
    <>
      <h2>Registration</h2>

      <div className={styles.text}>
        <LockClosedIcon width={20} /> Enter one time password
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <OtpInput
          value={otp}
          valueLength={VALUE_LENGTH}
          onChange={handleChange}
        />

        <Button type="submit" color="primary">
          Next
          <ArrowRightIcon width={16} />
        </Button>
      </form>

      <div className={styles.action}>
        Didn’t receive? <a>Tap to resend</a>
      </div>
    </>
  );
};

export default OTPStep;
