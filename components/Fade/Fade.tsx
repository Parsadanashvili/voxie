import React, {
  JSXElementConstructor,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

interface Props {
  delay?: number;
  transitionDuration?: number;
  WrapperTag?: JSXElementConstructor<any>;
  ChildTag?: JSXElementConstructor<any>;
  className?: string;
  childClassName?: string;
  visible?: boolean;
  onComplete?: () => any;
}

const FadeIn: React.FC<PropsWithChildren<Props>> = ({
  delay = 50,
  transitionDuration = 400,
  WrapperTag = "div",
  ChildTag = "div",
  className,
  childClassName,
  visible = true,
  onComplete,
  children,
}) => {
  const [maxIsVisible, setMaxIsVisible] = useState(0);

  useEffect(() => {
    let count = React.Children.count(children);

    if (!visible) {
      count = 0;
    }

    if (count == maxIsVisible) {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, transitionDuration);
      return () => clearTimeout(timeout);
    }

    const increment = count > maxIsVisible ? 1 : -1;

    const timeout = setTimeout(() => {
      setMaxIsVisible(maxIsVisible + increment);
    }, delay);
    return () => clearTimeout(timeout);
  }, [
    React.Children.count(children),
    delay,
    maxIsVisible,
    visible,
    transitionDuration,
  ]);

  return (
    <WrapperTag className={className}>
      {React.Children.map(children, (child, i) => {
        return (
          <ChildTag
            className={childClassName}
            style={{
              transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
              transform: maxIsVisible > i ? "none" : "translateY(20px)",
              opacity: maxIsVisible > i ? 1 : 0,
            }}
          >
            {child}
          </ChildTag>
        );
      })}
    </WrapperTag>
  );
};

export default FadeIn;
