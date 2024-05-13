import { IconTrash } from '@tabler/icons-react';
import { useDeleteDeedMutation } from '../../../services/users';
import { Loader } from '../../ui';

type DeleteDeedButtonProps = {
  userId: number;
  deedId: number;
};

export default function DeleteDeedButton({ userId, deedId }: DeleteDeedButtonProps) {
  const [deleteDeed, { isLoading: isDeleteDeedLoading }] = useDeleteDeedMutation();
  const handleDeleteDeed = () => deleteDeed({ userId, deedId });
  return (
    <button className='btn btn-square btn-error btn-sm' onClick={handleDeleteDeed}>
      {isDeleteDeedLoading ? <Loader className='text-white' /> : <IconTrash className='h-4 w-4 text-white' />}
    </button>
  );
}
