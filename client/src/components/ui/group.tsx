import { ReactNode } from 'react';
import { createClassName } from '../../utils/createClassName';

type GroupProps = {
  children: ReactNode;
  className?: string;
};

export default function Group({ children, className }: GroupProps) {
  return <div className={createClassName('flex flex-row', className)}>{children}</div>;
}
