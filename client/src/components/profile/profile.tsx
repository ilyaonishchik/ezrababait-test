import { useGetMeQuery } from '../../services/auth';
import CreateDeed from './create-deed';
import Container from '../ui/container';
import DeedsList from './deeds-list';
import UserHeader from '../common/user-header';
import { Loader } from '../ui';

export default function Profile() {
  const { isLoading, data: me } = useGetMeQuery();

  if (isLoading) return <Loader />;

  return (
    <Container>
      <UserHeader userId={me!.id} />
      <CreateDeed />
      <DeedsList />
    </Container>
  );
}
