import React from "react";
import styles from "./Spinner.module.css";

const sizes = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const colors = {
  primary: styles.primary,
  success: styles.success,
  danger: styles.danger,
};

interface SpinnerProps {
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
}

const Spinner: React.FC<SpinnerProps> = ({ size, color }) => {
  const sizeCn = size ? sizes[size] : "";
  const colorCn = color ? colors[color] : "";
  const cn = `${styles.root} ${sizeCn} ${colorCn}`;

  return (
    <svg
      className={cn}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Spinner;
