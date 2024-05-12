import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from '../../services/auth';
import CreateDeed from './create-deed';
import ProfileHeader from './profile-header';
import Container from '../ui/container';
import DeedsList from './deeds-list';

export default function Profile() {
  const { isError } = useGetMeQuery();

  if (isError) return <Navigate to='/sign-in' />;

  return (
    <Container>
      <ProfileHeader />
      <CreateDeed />
      <DeedsList />
    </Container>
  );
}
