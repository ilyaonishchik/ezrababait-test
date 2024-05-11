import { useNavigate } from 'react-router-dom';
import { useSignOutMutation } from '../../services/auth';
import { IconSquareArrowLeft } from '@tabler/icons-react';

export default function SignOutButton() {
  const [signOut] = useSignOutMutation();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut()
      .then(() => navigate('/'))
      .catch((e) => console.log(e));
  };

  return (
    <button className='btn btn-sm' onClick={handleSignOut}>
      <IconSquareArrowLeft className='h-4 w-4' />
      <span>Sign out</span>
    </button>
  );
}
