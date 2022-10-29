import React, { FormEvent, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "@components/Button";
import styles from "@styles/Auth.module.css";
import OtpInput from "@components/OtpInput";
import useAuth from "@hooks/useAuth";
import { useRouter } from "next/router";
import { setToken } from "@utils/jwt-token";

const VALUE_LENGTH = 4;

interface Props {
  stepData: { [key: string]: string };
}

const OTPStep = ({ stepData }: Props) => {
  const router = useRouter();
  const { verifyOTP } = useAuth();
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (otp.length == VALUE_LENGTH && !isLoading) {
      setIsLoading(true);

      await verifyOTP({ email: stepData?.email, otp })
        .then(async (res) => {
          if (!res.data?.user?.username) {
            router.push("/auth/complete");
          } else {
            router.push("/");
          }
        })
        .catch(() => (setIsInvalid(true), setIsLoading(false)));
    } else {
      setIsInvalid(true);
    }
  };

  const handleChange = (value: string) => {
    setOtp(value.trim());

    if (value.trim().length == VALUE_LENGTH) setIsInvalid(false);
  };

  return (
    <>
      <h2>Authorization</h2>

      <div className={styles.text}>
        <LockClosedIcon width={20} /> Enter one time password
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <OtpInput
          value={otp}
          valueLength={VALUE_LENGTH}
          onChange={handleChange}
          isInvalid={isInvalid}
        />

        <Button type="submit" color="primary" loading={isLoading}>
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
