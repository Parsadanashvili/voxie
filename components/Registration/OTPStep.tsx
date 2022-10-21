import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  KeyboardEventHandler,
} from "react";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/Auth.module.css";
import stepStyles from "./OTPStep.module.css";

const OTPStep = () => {
  const handleSubmit = (e: FormEvent) => {};

  const onKeydownOtp = (e: KeyboardEvent<HTMLInputElement>) => {};

  return (
    <>
      <div className={styles.text}>
        <LockClosedIcon width={20} /> Enter one time password
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={stepStyles.otp_inputs}>
          <input onKeyDown={onKeydownOtp} className={stepStyles.input} />
          <input onKeyDown={onKeydownOtp} className={stepStyles.input} />
          <input onKeyDown={onKeydownOtp} className={stepStyles.input} />
          <input onKeyDown={onKeydownOtp} className={stepStyles.input} />
        </div>

        <Button type="submit" color="primary">
          Next
          <ArrowRightIcon width={16} />
        </Button>
      </form>
    </>
  );
};

export default OTPStep;
