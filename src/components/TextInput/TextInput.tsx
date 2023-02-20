import { ChangeEvent, ComponentPropsWithoutRef, forwardRef } from "react";

import classNames from "classnames";

type Props = {
  icon?: JSX.Element;
  onChange?: (value: string) => void;
} & Omit<ComponentPropsWithoutRef<"input">, "onChange">;

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value, className, icon, ...props }, ref) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (props.disabled) {
        return;
      }
      onChange?.(event.target.value);
    };

    return (
      <div className="flex flex-row flex-grow items-center relative w-min">
        <input
          ref={ref}
          type="text"
          onChange={handleChange}
          value={value}
          className={classNames(
            "py-2 px-3 pr-7 border border-gray-200 rounded-md",
            className
          )}
          {...props}
        />
        {icon && <i className="absolute right-2">{icon}</i>}
      </div>
    );
  }
);
