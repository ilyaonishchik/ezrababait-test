import { useGetMeQuery } from '../../services/auth';
import Error from '../ui/error';
import Loader from '../ui/loader';

export default function Profile() {
  const { isLoading, error, data: me } = useGetMeQuery({});

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  return <div>{me?.username}</div>;
}
