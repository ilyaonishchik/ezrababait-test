import { createClassName } from '../../utils/createClassName';
import { ChildrenProps } from '../../types/ChildrenProps';
import { ClassNameProps } from '../../types/ClassNameProps';

export default function Paper({ children, className }: ChildrenProps & ClassNameProps) {
  return <div className={createClassName('rounded-xl bg-white p-8 shadow-md', className)}>{children}</div>;
}
