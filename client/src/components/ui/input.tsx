import { ClassNameProps } from '../../types/ClassNameProps';
import { createClassName } from '../../utils/createClassName';
import Stack from './stack';

type InputProps = {
  label?: string;
  error?: string;
  touched?: boolean;
};

export default function Input({
  label,
  error,
  touched,
  className,
  ...detailedHTMLProps
}: InputProps &
  ClassNameProps &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <Stack className={createClassName('', className)}>
      {label && <span className='font-semibold'>{label}</span>}
      <input type='text' {...detailedHTMLProps} className='input input-bordered' />
      {error && touched && <span className='italic text-red-500'>{error}</span>}
    </Stack>
  );
}
