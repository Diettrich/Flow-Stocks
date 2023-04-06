import classNames from "classnames";
import type { FunctionComponent, ReactNode } from "react";

export interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: FunctionComponent<ContainerProps> = ({
  children,
  className,
}) => (
  <div className={classNames("container mx-auto", className)}>{children}</div>
);

export default Container;
