import { Container, Error, Loader } from '../ui';
import { useGetMeQuery } from '../../services/api';
import DeleteAccount from './delete-account';
import ChangeUsername from './change-username';
import General from './general';

export default function Settings() {
  const { isLoading, error, data } = useGetMeQuery();

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;
  const me = data!;

  return (
    <Container>
      <General me={me} />
      <ChangeUsername username={me.username} />
      <DeleteAccount />
    </Container>
  );
}
