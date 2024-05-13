import { Container, Error, Loader } from '../ui';
import { useGetMeQuery } from '../../services/auth';
import DeleteAccount from './delete-account';
import ChangeUsername from './change-username';

export default function Settings() {
  const { isLoading, error, data } = useGetMeQuery();

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;
  const me = data!;

  return (
    <Container>
      <ChangeUsername username={me.username} />
      <DeleteAccount />
    </Container>
  );
}
