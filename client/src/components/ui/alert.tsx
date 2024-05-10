import { ReactNode } from 'react';

type AlertProps = {
  children: ReactNode;
  variant: 'warning' | 'error';
};

export default function Alert({ children, variant }: AlertProps) {
  switch (variant) {
    case 'warning':
      return <span className='text-xs text-yellow-500'>{children}</span>;
    case 'error':
      return <span className='text-xs text-red-500'>{children}</span>;
    default:
      return <span className='text-xs'>{children}</span>;
  }
}
