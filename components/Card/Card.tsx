import React, { ReactNode } from "react";
import styles from "./Card.module.css";

interface Props {
  children?: ReactNode;
  width?: number;
}

const Card = ({ children, width = 350 }: Props) => {
  return (
    <div className={styles.card} style={{ width: `${width}px` }}>
      {children}
    </div>
  );
};

export default Card;
