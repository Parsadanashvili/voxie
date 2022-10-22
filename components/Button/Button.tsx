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

// export type ButtonProps = JSX.IntrinsicElements["button"] & {
//   color?: keyof typeof colorClassnames;
//   href?: undefined;
//   children: ReactNode;
// };

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: keyof typeof colorClassnames;
  icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  disabled,
  icon,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.root} ${colorClassnames[color]} ${className}`}
      type={props.type || "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
