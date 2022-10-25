import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Joi from "joi";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import styles from "../../styles/Auth.module.css";
import Button from "../Button";
import Input from "../Input";

interface Props {
  onNext: (data: { [key: string]: string }) => void | {};
  stepData: { [key: string]: string };
}

const EmailStep = ({ onNext }: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const { values, errors, validate, inputHandler, setErrors } = useForm([
    {
      name: "email",
      value: "",
      validation: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
    },
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(errors).length == 0 && !isDisabled) {
      axios
        .post("/api/login", {
          email: values.email,
        })
        .then(() =>
          onNext({
            email: String(values.email),
          })
        )
        .catch((err) =>
          setErrors({
            email: err,
          })
        );
    }

    validate();
  };

  useEffect(() => {
    if (isDisabled && Object.keys(errors).length != 0) {
      setIsDisabled(false);
    }
  }, [errors]);

  return (
    <>
      <h2>Login</h2>

      <div className={styles.text}>
        <EnvelopeIcon width={20} /> Enter your email
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          name="email"
          placeholder={"E-mail"}
          value={values?.email}
          error={errors.email}
          onChange={inputHandler}
          autoComplete={"off"}
        />
        <Button type="submit" color="primary">
          Next
          <ArrowRightIcon width={16} />
        </Button>
      </form>

      <div className={styles.action + " " + styles.primary}>
        Not registered?{" "}
        <Link href={"/register"} passHref>
          Register
        </Link>
      </div>
    </>
  );
};

export default EmailStep;
