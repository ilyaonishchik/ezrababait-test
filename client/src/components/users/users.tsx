import { usePagination } from '../../hooks/usePagination';
import { useGetUsersQuery } from '../../services/users';
import { Loader } from '../ui';
import Container from '../ui/container';
import Search from './search';
import UsersList from './users-list';

export default function Users() {
  const { page, setPage, take, setTake } = usePagination({ initialPage: 1, initialTake: 5 });
  const { isLoading, data } = useGetUsersQuery({ page, take });

  return (
    <Container>
      <Search />
      {isLoading && <Loader />}
      {data && <UsersList users={data[0]} paginationProps={{ count: data[1], page, setPage, take, setTake }} />}
    </Container>
  );
}
