import Button from "@components/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import useForm from "@hooks/useForm";
import { getToken } from "@utils/jwt-token";
import Joi from "joi";
import axios from "lib/axios";
import { validateConfig } from "next/dist/server/config-shared";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import styles from "./StartARoomModal.module.css";

interface Props {
  open: boolean;
  onClose: Function;
}

const StartARoomModal: React.FC<Props> = ({ open, onClose }) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { values, errors, inputHandler, validate, setErrors } = useForm([
    {
      name: "title",
      validation: Joi.string().label("Title"),
    },
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(errors).length == 0 && !isLoading) {
      setIsLoading(true);

      const token = await getToken();

      axios
        .post(
          "/api/rooms",
          {
            title: values.title,
          },
          {
            headers: {
              Authorization: token?.accessToken,
            },
          }
        )
        .then((res) => {
          push(`/room/${res.data.id}`);
        })
        .catch(
          (err) => (setIsLoading(false), setErrors(err?.response?.message))
        );
    } else {
      validate();
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={"Start a room"}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Room discuss topic"
          value={values.title}
          error={errors.title}
          onChange={inputHandler}
          name="title"
        />

        <Button loading={isLoading} className={styles.button}>
          Let's Go <ArrowUpRightIcon width={15} strokeWidth={2.7} />
        </Button>
      </form>
    </Modal>
  );
};

export default StartARoomModal;
