import React, {
  FC,
  ForwardedRef,
  forwardRef,
  Fragment,
  ReactNode,
} from "react";
import styles from "./Input.module.css";

interface Props {
  icon?: ReactNode;
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  name?: string;
  id?: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  ref?: ForwardedRef<HTMLInputElement>;
}

const Input: FC<Props> = forwardRef(
  (
    {
      icon,
      className,
      type,
      placeholder,
      value,
      name,
      id,
      autoComplete,
      onChange,
      onFocus,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onClick,
      ...props
    }: Props,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={styles.wrapper}>
        <input
          ref={ref}
          type={type}
          className={styles.field}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          autoComplete={autoComplete}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
