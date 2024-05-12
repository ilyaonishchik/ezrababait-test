import { ChildrenProps } from '../../types/ChildrenProps';

type AlertProps = {
  variant: 'warning' | 'error';
};

export default function Alert({ children, variant }: AlertProps & ChildrenProps) {
  switch (variant) {
    case 'warning':
      return <span className='text-xs text-yellow-500'>{children}</span>;
    case 'error':
      return <span className='text-xs text-red-500'>{children}</span>;
    default:
      return <span className='text-xs'>{children}</span>;
  }
}
