import classNames from 'classnames';
import type { ReactNode } from 'react';

export interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = ({ children, className }: ContainerProps) => (
  <div className={classNames('container mx-auto', className)}>{children}</div>
);

export default Container;
