import { IconX } from '@tabler/icons-react';
import { ChildrenProps } from '../../types/props/ChildrenProps';
import Group from './group';
import Paper from './paper';
import Stack from './stack';

type ModalProps = {
  title?: string;
  opened: boolean;
  onClose: () => void;
};

export default function Modal({ children, title, opened, onClose }: ModalProps & ChildrenProps) {
  return (
    <>
      <div
        className={`${opened ? 'fixed' : 'hidden'} left-0 top-0 h-screen w-screen bg-black opacity-50 transition-all`}
        onClick={onClose}
      ></div>
      <Paper
        className={`${opened ? 'fixed' : 'hidden'} left-1/2 top-1/2 z-10 w-[280px] translate-x-[-50%] translate-y-[-50%] sm:w-[400px] md:w-[600px]`}
      >
        <Stack className='gap-5'>
          <Group className='justify-between'>
            <div className='text-lg font-semibold'>{title}</div>
            <button className='btn btn-square btn-sm justify-self-end' onClick={onClose}>
              <IconX />
            </button>
          </Group>
          {children}
        </Stack>
      </Paper>
    </>
  );
}
