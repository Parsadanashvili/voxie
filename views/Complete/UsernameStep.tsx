import React, { FormEvent, useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "@components//Button";
import Input from "@components/Input";
import styles from "@styles/Auth.module.css";
import useForm from "@hooks/useForm";
import Joi from "joi";
import axios from "lib/axios";
import { getToken } from "@utils/jwt-token";

interface Props {
  onNext: (data?: any) => void | {};
  stepData: { [key: string]: string };
}

const UsernameStep = ({ onNext }: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { values, errors, validate, inputHandler, setErrors } = useForm([
    {
      name: "username",
      value: "",
      validation: Joi.string().max(16).min(3).required().label("Username"),
    },
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(errors).length == 0 && !isDisabled) {
      setIsLoading(true);

      const token = await getToken();

      axios
        .post(
          "/api/user/setUsername",
          {
            username: values.username,
          },
          {
            headers: {
              Authorization: token?.accessToken,
            },
          }
        )
        .then((res) => {
          return onNext({
            username: values.username,
          });
        })
        .catch((err) => {
          setErrors({
            username: err.response.data.message,
          });

          setIsLoading(false);
        });
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
      <h2>Complete</h2>

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
