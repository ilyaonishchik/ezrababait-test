import { ReactNode } from 'react';
import { createClassName } from '../../utils/createClassName';

type StackProps = {
  children: ReactNode;
  className?: string;
};

export default function Stack({ children, className }: StackProps) {
  return <div className={createClassName('flex flex-col', className)}>{children}</div>;
}
