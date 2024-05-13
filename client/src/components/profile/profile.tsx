import { useGetMeQuery } from '../../services/api';
import CreateDeed from './create-deed';
import Container from '../ui/container';
import UserHeader from '../common/user-header';
import { Error, Loader } from '../ui';
import DeedsList from '../common/deeds-list/deeds-list';

export default function Profile() {
  const { isLoading, error, data } = useGetMeQuery();

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;
  const me = data!;

  return (
    <Container>
      <UserHeader userId={me.id} />
      <CreateDeed />
      <DeedsList userId={me.id} />
    </Container>
  );
}
