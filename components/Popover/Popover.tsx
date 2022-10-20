import React, {
  MutableRefObject,
  ReactElement,
  ReactHTML,
  ReactNode,
  RefObject,
} from "react";
import styles from "./Popover.module.css";

const resolveAnchorEl = (anchorEl: HTMLElement | Function | null) => {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
};

export const getOffsetTop = (rect: { height: number }, vertical: string) => {
  let offset = 0;

  if (typeof vertical === "number") {
    offset = vertical;
  } else if (vertical === "center") {
    offset = rect.height / 2;
  } else if (vertical === "bottom") {
    offset = rect.height;
  }

  return offset;
};

export const getOffsetLeft = (rect: { width: number }, horizontal: string) => {
  let offset = 0;

  if (typeof horizontal === "number") {
    offset = horizontal;
  } else if (horizontal === "center") {
    offset = rect.width / 2;
  } else if (horizontal === "right") {
    offset = rect.width;
  }

  return offset;
};

const getTransformOriginValue = (transformOrigin: {
  horizontal: "left" | "center" | "right" | number;
  vertical: "top" | "center" | "bottom" | number;
}) => {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map((n) => (typeof n === "number" ? `${n}px` : n))
    .join(" ");
};

function debounce(func: () => void, wait = 166) {
  let timeout: ReturnType<typeof setTimeout>;
  function debounced(...args: []) {
    const later = () => {
      func.apply(
        {
          clear: () => clearTimeout(timeout),
        },
        args
      );
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

interface Props {
  anchorEl: HTMLElement | Function | null;
  anchorOrigin?: {
    horizontal: "left" | "center" | "right";
    vertical: "top" | "center" | "bottom";
  };
  anchorPosition?: {
    left: number;
    top: number;
  };
  anchorReference?: string;
  transformOrigin?: {
    horizontal: "left" | "center" | "right";
    vertical: "top" | "center" | "bottom";
  };
  children?: ReactElement | ReactElement[];
  className?: string;
  marginThreshold?: number;
  open: boolean;
}

const Popover = React.forwardRef(
  (
    {
      anchorEl,
      anchorOrigin = {
        vertical: "top",
        horizontal: "left",
      },
      anchorPosition,
      anchorReference = "anchorEl",
      transformOrigin = {
        vertical: "top",
        horizontal: "left",
      },
      children,
      className,
      marginThreshold = 16,
      open,
    }: Props,
    ref
  ) => {
    const paperRef = React.useRef<HTMLDivElement | null>(null);

    const [isPositioned, setIsPositioned] = React.useState(open);

    const getAnchorOffset = React.useCallback(() => {
      const anchorElement = resolveAnchorEl(anchorEl);

      if (!anchorElement) {
        console.warn(
          [
            "The `anchorEl` prop provided to the component is invalid.",
            "The anchor element should be part of the document layout.",
            "Make sure the element is present in the document or that it's not display none.",
          ].join("\n")
        );

        return {
          top: 0,
          left: 0,
        };
      }

      const anchorRect = anchorElement.getBoundingClientRect();

      return {
        top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
        left:
          anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
      };
    }, [
      anchorEl,
      anchorOrigin.horizontal,
      anchorOrigin.vertical,
      anchorPosition,
    ]);

    const getTransformOrigin = React.useCallback(
      (elemRect: { height: number; width: number }) => {
        return {
          vertical: getOffsetTop(elemRect, transformOrigin.vertical),
          horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
        };
      },
      [transformOrigin.horizontal, transformOrigin.vertical]
    );

    const getPositioningStyle = React.useCallback(
      (element: HTMLElement) => {
        const elemRect = {
          width: element.offsetWidth,
          height: element.offsetHeight,
        };

        // Get the transform origin point on the element itself
        const elemTransformOrigin = getTransformOrigin(elemRect);

        if (anchorReference === "none") {
          return {
            top: null,
            left: null,
            transformOrigin: getTransformOriginValue(elemTransformOrigin),
          };
        }

        // Get the offset of the anchoring element
        const anchorOffset = getAnchorOffset();

        // Calculate element positioning
        let top = anchorOffset.top - elemTransformOrigin.vertical;
        let left = anchorOffset.left - elemTransformOrigin.horizontal;
        const bottom = top + elemRect.height;
        const right = left + elemRect.width;

        const reslovedAnchorEl = resolveAnchorEl(anchorEl);
        const ownerDocument =
          (reslovedAnchorEl && reslovedAnchorEl.ownerDocument) || document;
        const containerWindow = ownerDocument.defaultView || window;

        // Window thresholds taking required margin into account
        const heightThreshold = containerWindow.innerHeight - marginThreshold;
        const widthThreshold = containerWindow.innerWidth - marginThreshold;

        // Check if the vertical axis needs shifting
        if (top < marginThreshold) {
          const diff = top - marginThreshold;
          top -= diff;
          elemTransformOrigin.vertical += diff;
        } else if (bottom > heightThreshold) {
          const diff = bottom - heightThreshold;
          top -= diff;
          elemTransformOrigin.vertical += diff;
        }

        // Check if the horizontal axis needs shifting
        if (left < marginThreshold) {
          const diff = left - marginThreshold;
          left -= diff;
          elemTransformOrigin.horizontal += diff;
        } else if (right > widthThreshold) {
          const diff = right - widthThreshold;
          left -= diff;
          elemTransformOrigin.horizontal += diff;
        }

        return {
          top: `${Math.round(top)}px`,
          left: `${Math.round(left)}px`,
          transformOrigin: getTransformOriginValue(elemTransformOrigin),
        };
      },
      [
        anchorEl,
        anchorReference,
        getAnchorOffset,
        getTransformOrigin,
        marginThreshold,
      ]
    );

    const setPositioningStyles = React.useCallback(() => {
      const element: HTMLElement | null | undefined = paperRef.current;

      if (element) {
        const positioning = getPositioningStyle(element);

        if (positioning.top !== null) {
          element.style.top = positioning.top;
        }
        if (positioning.left !== null) {
          element.style.left = positioning.left;
        }
        element.style.transformOrigin = positioning.transformOrigin;
        setIsPositioned(true);
      }

      return;
    }, [getPositioningStyle]);

    React.useEffect(() => {
      if (open) {
        setPositioningStyles();
      }
    });

    React.useEffect(() => {
      if (!open) {
        return undefined;
      }

      const handleResize = debounce(() => {
        setPositioningStyles();
      });

      const reslovedAnchorEl = resolveAnchorEl(anchorEl);
      const ownerDocument =
        (reslovedAnchorEl && reslovedAnchorEl.ownerDocument) || document;
      const containerWindow = ownerDocument.defaultView || window;

      containerWindow.addEventListener("resize", handleResize);
      return () => {
        handleResize.clear();
        containerWindow.removeEventListener("resize", handleResize);
      };
    }, [anchorEl, open, setPositioningStyles]);

    return (
      <div
        ref={paperRef}
        className={styles.wrapper + (className ? " " + className : "")}
      >
        {children}
      </div>
    );
  }
);

export default Popover;
