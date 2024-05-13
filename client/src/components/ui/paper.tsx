import { createClassName } from '../../utils/createClassName';
import { ChildrenProps } from '../../types/props/ChildrenProps';
import { ClassNameProps } from '../../types/props/ClassNameProps';

type PaperProps = {
  title?: string;
};

export default function Paper({ title, children, className }: PaperProps & ChildrenProps & ClassNameProps) {
  return (
    <div className={createClassName('xs:p-8 rounded-xl bg-white p-6 shadow-md', className)}>
      {title && <h2 className='mb-5 text-xl font-bold'>{title}</h2>}
      {children}
    </div>
  );
}
