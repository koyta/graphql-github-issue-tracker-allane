import { ComponentPropsWithoutRef, forwardRef } from "react";

import classNames from "classnames";

type Props = ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ type = "button", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={classNames(
          "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-400 border border-blue-500 bg-blue-400 hover:bg-blue-500 transition-colors text-white p-2 rounded-md",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
