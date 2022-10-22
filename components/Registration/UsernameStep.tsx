import React, { FormEvent, useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/Auth.module.css";
import useForm from "../../hooks/useForm";
import Joi from "joi";

interface Props {
  onNext: () => void | {};
}

const UsernameStep = ({ onNext }: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const { values, errors, validate, inputHandler } = useForm([
    {
      name: "username",
      value: "",
      validation: Joi.string().max(16).min(3).required().label("Username"),
    },
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(errors).length == 0 && !isDisabled) {
      return onNext();
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
      <h2>Registration</h2>

      <div className={styles.text}>
        <UserIcon width={20} /> Enter your username
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          name="username"
          placeholder={"Username"}
          value={values?.username}
          error={errors?.username}
          onChange={inputHandler}
          autoComplete={"off"}
        />
        <Button type="submit" color="primary">
          Next
          <ArrowRightIcon width={16} />
        </Button>
      </form>
    </>
  );
};

export default UsernameStep;
