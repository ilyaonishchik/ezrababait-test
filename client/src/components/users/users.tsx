import { useLocation } from 'react-router-dom';
import { usePagination } from '../../hooks/usePagination';
import { useGetUsersQuery } from '../../services/api';
import { Loader, Paper } from '../ui';
import Container from '../ui/container';
import Search from './search';
import UsersList from './users-list';

export default function Users() {
  const queryParams = new URLSearchParams(useLocation().search);
  const followerId = +queryParams.get('followerId');
  const followingId = +queryParams.get('followingId');
  const query = queryParams.get('query');

  const { page, setPage, take, setTake } = usePagination({ initialPage: 1, initialTake: 5 });
  const { isLoading, data } = useGetUsersQuery({ page, take, followerId, followingId, query: query || '' });

  return (
    <Container>
      <Search />
      {isLoading && <Loader />}
      {data && data[1] ? (
        <UsersList users={data[0]} paginationProps={{ count: data[1], page, setPage, take, setTake }} />
      ) : (
        <Paper className='text-xl'>Nobody found</Paper>
      )}
    </Container>
  );
}
