import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import classNames from "classnames";

export const Card = ({
  children,
  className,
}: PropsWithChildren<ComponentPropsWithoutRef<"div">>) => {
  return (
    <div
      className={classNames(
        "flex flex-col p-2 rounded-md transition-colors hover:bg-gray-100 border-2 border-transparent hover:border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
};
