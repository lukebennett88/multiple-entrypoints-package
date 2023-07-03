import { forwardRef, useCallback, useRef } from "react";
import { type ButtonProps } from "./types";
import { mergeRefs } from "../utils";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { children, isLoading, onClick, ...consumerProps },
    forwardedRef
  ) {
    const internalRef = useRef<HTMLButtonElement>(null);
    const handleOnClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        internalRef.current?.focus();
        if (isLoading) return;
        if (onClick) onClick(event);
      },
      [isLoading, onClick]
    );
    return (
      <button
        {...consumerProps}
        ref={mergeRefs([internalRef, forwardedRef])}
        onClick={handleOnClick}
      >
        {children}
      </button>
    );
  }
);
