import { ChildrenProps } from '../../types/ChildrenProps';
import Stack from './stack';

export default function Container({ children }: ChildrenProps) {
  return (
    <div className='container max-w-[1000px] p-4'>
      <Stack className='gap-5'>{children}</Stack>
    </div>
  );
}
