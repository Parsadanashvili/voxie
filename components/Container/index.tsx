import React, { ReactElement, ReactHTML } from "react";
import styles from "./Container.module.css";

interface Props {
  children?: ReactElement | ReactElement[];
}

const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
