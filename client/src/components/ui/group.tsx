import { ReactNode } from 'react';
import { createClassName } from '../../utils/createClassName';

type GroupProps = {
  children: ReactNode;
  className?: string;
};

export default function Group({ children, className }: GroupProps) {
  return <div className={createClassName('flex flex-row items-center gap-2', className)}>{children}</div>;
}
