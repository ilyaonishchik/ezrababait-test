import { createClassName } from '../../utils/createClassName';
import { ClassNameProps } from '../../types/props/ClassNameProps';
import { ChildrenProps } from '../../types/props/ChildrenProps';

export default function Group({ children, className }: ChildrenProps & ClassNameProps) {
  return <div className={createClassName('flex flex-row items-center gap-2', className)}>{children}</div>;
}
