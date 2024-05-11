import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from '../../services/auth';
import { Stack } from '../ui';
import CreateDeed from './create-deed';
import Deeds from './deeds';
import ProfileHeader from './profile-header';

export default function Profile() {
  const { isError } = useGetMeQuery();

  if (isError) return <Navigate to='/sign-in' />;

  return (
    <Stack className='m-auto max-w-[800px] gap-5 p-3'>
      <ProfileHeader />
      <CreateDeed />
      <Deeds />
    </Stack>
  );
}
