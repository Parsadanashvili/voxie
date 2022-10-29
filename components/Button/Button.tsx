import Spinner from "@components/Spinner";
import Link, { LinkProps } from "next/link";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from "react";
import styles from "./Button.module.css";

const colorClassnames = {
  primary: styles.primary,
  success: styles.success,
  danger: styles.danger,
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: keyof typeof colorClassnames;
  icon?: ReactNode;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  disabled,
  loading,
  icon,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`${styles.root} ${colorClassnames[color]} ${className}`}
      type={props.type || "button"}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};

export default Button;
