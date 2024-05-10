import { useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../../services/auth';
import Loader from '../ui/loader';
import SignOutButton from './sign-out-button';
import { useEffect } from 'react';

export default function Profile() {
  const { isLoading, error, data: me } = useGetMeQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) navigate('/sign-in');
  }, [navigate, error]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div>
        <div>{me?.username}</div>
        <div>{me?.email}</div>
      </div>
      <SignOutButton />
    </div>
  );
}
