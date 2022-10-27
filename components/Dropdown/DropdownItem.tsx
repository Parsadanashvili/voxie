import React, { DetailedHTMLProps, LiHTMLAttributes, ReactNode } from "react";
import styles from "./DropdownItem.module.css";

type ButtonProps = DetailedHTMLProps<
  LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  children: ReactNode;
};

interface Props {
  children?: ReactNode;
}

const DropdownItem: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <li className={styles.item} {...props}>
      {children}
    </li>
  );
};

export const DropdownItemIcon = ({ children }: Props) => {
  return <div className={styles["item-icon"]}>{children}</div>;
};

export const DropdownItemText = ({ children }: Props) => {
  return <div className={styles["item-text"]}>{children}</div>;
};

export default DropdownItem;
