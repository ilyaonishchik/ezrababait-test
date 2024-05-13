import { User } from '../../types/entities/User';
import { Pagination, Paper, Stack } from '../ui';
import { PaginationProps } from '../ui/pagination';
import UsersListItem from './users-list-item';

type UsersList = {
  users: User[];
};

export default function UsersList({ users, paginationProps }: UsersList & PaginationProps) {
  return (
    <Paper className='p-[1rem] sm:p-8'>
      <Stack className='gap-6'>
        {users.map((user) => (
          <UsersListItem key={user.id} user={user} />
        ))}
        <Pagination paginationProps={paginationProps} />
      </Stack>
    </Paper>
  );
}
