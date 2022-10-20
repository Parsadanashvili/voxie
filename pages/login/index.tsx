import { NextPage } from "next";
import React from "react";
import Card from "../../components/Card";
import styles from "../../styles/Login.module.css";

const Login: NextPage = () => {
  return (
    <main className={styles["login-wrapper"]}>
      <Card minWidth={400}>
        <h1>Login</h1>
      </Card>
    </main>
  );
};

export default Login;
