import React, { ReactElement, ReactNode } from "react";
import styles from "./DropdownItem.module.css";

interface Props {
  children?: ReactNode;
}

const DropdownItem = ({ children }: Props) => {
  return <li className={styles.item}>{children}</li>;
};

export const DropdownItemIcon = ({ children }: Props) => {
  return <div className={styles["item-icon"]}>{children}</div>;
};

export const DropdownItemText = ({ children }: Props) => {
  return <div className={styles["item-text"]}>{children}</div>;
};

export default DropdownItem;
