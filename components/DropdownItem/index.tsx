import React from "react";
import styles from "./DropdownItem.module.css";

const DropdownItem = ({ children }) => {
  return <li className={styles.dropdownItem}>{children}</li>;
};

export default DropdownItem;
