import { ChildrenProps, ClassNameProps } from '../../types/props';
import { createClassName } from '../../utils/createClassName';

export default function Avatar({ children, className }: ChildrenProps & ClassNameProps) {
  return (
    <div className='avatar placeholder'>
      <div className={createClassName('rounded-full bg-neutral text-neutral-content', className)}>{children}</div>
    </div>
  );
}
