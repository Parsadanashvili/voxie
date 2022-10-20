import Link, { LinkProps } from "next/link";
import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = JSX.IntrinsicElements["button"] & {
  color?: "primary" | "success" | "danger";
  href?: undefined;
  children: ReactNode;
};

type AnchorProps = JSX.IntrinsicElements["a"] & {
  color?: "primary" | "success" | "danger";
  href: string;
  children: ReactNode;
} & LinkProps;

type PolymorphicProps = ButtonProps | AnchorProps;
type PolymorphicButton = {
  (props: AnchorProps): JSX.Element;
  (props: ButtonProps): JSX.Element;
};

const isAnchor = (props: PolymorphicProps): props is AnchorProps => {
  return props.href != undefined;
};

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PolymorphicProps
>((props, ref) => {
  if (isAnchor(props)) {
    const {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      color,
      ...rest
    } = props;
    const linkProps = {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
    };

    return (
      <Link {...linkProps}>
        <a
          className={
            styles.root +
            (color && styles[color] != undefined ? " " + styles[color] : "")
          }
          {...rest}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
        />
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={
        styles.root +
        (props.color && styles[props.color] != undefined
          ? " " + styles[props.color]
          : "")
      }
      ref={ref as ForwardedRef<HTMLButtonElement>}
      type={props.type || "button"}
    />
  );
});

export default Button;
