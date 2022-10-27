import React, { useEffect } from "react";

const useOnClickOutside = (
  ref: React.RefObject<any>,
  handler: Function | undefined,
  handleIf: Function | boolean | null = null
) => {
  const resloveHandleIf = (
    handleIf: Function | boolean,
    event: TouchEvent | MouseEvent | null = null
  ) => {
    return typeof handleIf === "function" ? handleIf(event) : handleIf;
  };

  useEffect(() => {
    const handleClickOutside = (event: TouchEvent | MouseEvent) => {
      if (!ref || !ref.current) {
        return;
      }

      if (handleIf) {
        const reslovedHandleIf = resloveHandleIf(handleIf, event);

        if (!reslovedHandleIf) {
          return;
        }
      }

      if (
        ref.current &&
        !ref.current.contains(event?.target as Node) &&
        handler
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
