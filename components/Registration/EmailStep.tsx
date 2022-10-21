import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/Auth.module.css";

interface Props {
  onNext: (value: { [key: string]: string | number }) => void | {};
}

const EmailStep = ({ onNext }: Props) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onNext({
      email,
    });
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className={styles.text}>
        <EnvelopeIcon width={20} /> Enter your email
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          placeholder={"E-mail"}
          value={email}
          onChange={handleChangeEmail}
        />
        <Button type="submit" color="primary">
          Next
          <ArrowRightIcon width={16} />
        </Button>
      </form>

      <div className={styles.info}>
        By entering your email, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </div>

      <div className={styles.action}>
        Already registered?{" "}
        <Link href={"/login"} passHref>
          Sign in
        </Link>
      </div>
    </>
  );
};

export default EmailStep;
