import { useNavigate } from 'react-router-dom';
import { Loader, Paper } from '../ui';
import { useDeleteMeMutation } from '../../services/users';

export default function DeleteAccount() {
  const navigate = useNavigate();

  const [deleteMe, { isLoading: isDeleteMeLoading }] = useDeleteMeMutation();
  const handleDeleteMe = async () => {
    try {
      await deleteMe();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Paper title='Delete account'>
      <button className='btn btn-error w-full text-white' onClick={handleDeleteMe}>
        {isDeleteMeLoading ? <Loader className='text-white' /> : 'Delete'}
      </button>
    </Paper>
  );
}
