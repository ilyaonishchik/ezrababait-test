import { ClassNameProps } from '../../types/props/ClassNameProps';
import { createClassName } from '../../utils/createClassName';

export default function Loader({ className }: ClassNameProps) {
  return <span className={createClassName('loading loading-spinner', className)}></span>;
}
