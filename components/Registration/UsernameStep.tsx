import React, { ChangeEvent, FormEvent, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/Auth.module.css";

interface Props {
  onNext: () => void | {};
}

const UsernameStep = ({ onNext }: Props) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onNext();
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <h2>Registration</h2>

      <div className={styles.text}>
        <UserIcon width={20} /> Enter your username
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          placeholder={"Username"}
          value={username}
          onChange={handleChangeUsername}
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
