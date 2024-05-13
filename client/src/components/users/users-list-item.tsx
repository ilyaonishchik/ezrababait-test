import { Link } from 'react-router-dom';
import { User } from '../../types/entities/User';
import { Avatar, Group, Stack } from '../ui';
import FollowButton from '../common/follow-button';

type UsersListItemProps = {
  user: User;
};

export default function UsersListItem({ user }: UsersListItemProps) {
  return (
    <Group className='justify-between'>
      <Link to={`/users/${user.id}`}>
        <Group className='gap-4'>
          <Avatar className='w-8 sm:w-16'>
            <span className='text-lg sm:text-3xl'>{user.username[0].toUpperCase()}</span>
          </Avatar>
          <Stack>
            <div className='xs:overflow-visible max-w-20 overflow-hidden overflow-ellipsis font-bold'>
              {user.username}
            </div>
            <div className='hidden md:block'>{user.email}</div>
          </Stack>
        </Group>
      </Link>
      <FollowButton userId={user.id} />
    </Group>
  );
}
