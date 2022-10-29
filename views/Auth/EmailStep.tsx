import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Joi from "joi";
import React, { FormEvent, useEffect, useState } from "react";
import useAuth from "@hooks/useAuth";
import useForm from "@hooks/useForm";
import styles from "@styles/Auth.module.css";
import Button from "@components/Button";
import Input from "@components/Input";

interface Props {
  onNext: (data: { [key: string]: string }) => void | {};
  stepData: { [key: string]: string };
}

const EmailStep = ({ onNext }: Props) => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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

    if (Object.keys(errors).length == 0 && !isLoading) {
      setIsLoading(true);

      await auth({ email: String(values.email) })
        .then(() => {
          onNext({
            email: String(values.email),
          });
        })
        .catch((err) => {
          setErrors({
            email: err,
          });

          setIsLoading(false);
        });

      return;
    }

    validate();
  };

  return (
    <>
      <h2>Authorization</h2>

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
        <Button type="submit" color="primary" loading={isLoading}>
          Next
          <ArrowRightIcon width={16} />
        </Button>
      </form>
    </>
  );
};

export default EmailStep;
