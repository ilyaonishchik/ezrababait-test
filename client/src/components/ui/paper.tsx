import { createClassName } from '../../utils/createClassName';
import { ChildrenProps } from '../../types/ChildrenProps';
import { ClassNameProps } from '../../types/ClassNameProps';

type PaperProps = {
  title?: string;
};

export default function Paper({ title, children, className }: PaperProps & ChildrenProps & ClassNameProps) {
  return (
    <div className={createClassName('rounded-xl bg-white p-8 shadow-md', className)}>
      {title && <h2 className='mb-5 text-xl font-bold'>{title}</h2>}
      {children}
    </div>
  );
}
