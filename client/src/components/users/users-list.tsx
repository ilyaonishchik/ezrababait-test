import { User } from '../../types/User';
import { Pagination, Paper, Stack } from '../ui';
import { PaginationProps } from '../ui/pagination';
import UsersListItem from './users-list-item';

type UsersList = {
  users: User[];
};

export default function UsersList({ users, paginationProps }: UsersList & PaginationProps) {
  return (
    <Paper>
      <Stack className='gap-4'>
        {users.map((user) => (
          <UsersListItem key={user.id} user={user} />
        ))}
        <Pagination paginationProps={paginationProps} />
      </Stack>
    </Paper>
  );
}
