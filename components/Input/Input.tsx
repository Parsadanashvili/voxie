import React, { forwardRef } from "react";
import styles from "./Input.module.css";

export interface InputPops extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  rows?: number;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputPops>(
  ({ className, textarea, error, ...props }, ref) => {
    const ring = error ? styles["is-invalid"] : "";
    const cn = `${styles.field} ${ring}`;

    return (
      <div className={styles.wrapper}>
        {textarea ? (
          <textarea ref={ref as any} className={cn} {...(props as any)} />
        ) : (
          <input ref={ref} className={cn} {...props} />
        )}
        {error && <div className={styles["error-msg"]}>{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
