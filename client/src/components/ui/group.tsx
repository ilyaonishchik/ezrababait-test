import { createClassName } from '../../utils/createClassName';
import { ClassNameProps } from '../../types/ClassNameProps';
import { ChildrenProps } from '../../types/ChildrenProps';

export default function Group({ children, className }: ChildrenProps & ClassNameProps) {
  return <div className={createClassName('flex flex-row items-center gap-2', className)}>{children}</div>;
}
