import { createClassName } from '../../utils/createClassName';
import { ChildrenProps } from '../../types/ChildrenProps';
import { ClassNameProps } from '../../types/ClassNameProps';

export default function Stack({ children, className }: ChildrenProps & ClassNameProps) {
  return <div className={createClassName('flex flex-col gap-2', className)}>{children}</div>;
}
