import { ReactNode } from 'react';
import { createClassName } from '../../utils/createClassName';

type PaperProps = {
  children: ReactNode;
  className?: string;
};

export default function Paper({ children, className }: PaperProps) {
  return <div className={createClassName('rounded-xl bg-white p-8 shadow-md', className)}>{children}</div>;
}
