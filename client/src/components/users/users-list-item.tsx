import { Link } from 'react-router-dom';
import { User } from '../../types/User';
import { Group, Stack } from '../ui';

type UsersListItemProps = {
  user: User;
};

export default function UsersListItem({ user }: UsersListItemProps) {
  return (
    <Group className='justify-between'>
      <Link to={`/users/${user.id}`}>
        <Group className='gap-4'>
          <div className='avatar placeholder'>
            <div className='w-16 rounded-full bg-neutral text-neutral-content'>
              <span className='text-3xl'>{user.username[0].toUpperCase()}</span>
            </div>
          </div>
          <Stack className='gap-0'>
            <div className='font-bold'>{user.username}</div>
            <div>{user.email}</div>
          </Stack>
        </Group>
      </Link>
      <button className='btn btn-primary btn-sm'>Follow</button>
    </Group>
  );
}
