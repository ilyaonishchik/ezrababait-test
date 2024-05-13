import { createClassName } from '../../utils/createClassName';
import { ChildrenProps } from '../../types/props/ChildrenProps';
import { ClassNameProps } from '../../types/props/ClassNameProps';

export default function Stack({ children, className }: ChildrenProps & ClassNameProps) {
  return <div className={createClassName('flex flex-col gap-2', className)}>{children}</div>;
}
