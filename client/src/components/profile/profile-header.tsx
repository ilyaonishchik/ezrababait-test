import { Link } from 'react-router-dom';
import { useGetMyDetailsQuery } from '../../services/users';
import { Loader, Error, Stack, Paper, Group } from '../ui';
import SignOutButton from './sign-out-button';
import { IconSearch, IconSettings } from '@tabler/icons-react';

export default function ProfileHeader() {
  const { isLoading, error, data: myDetails } = useGetMyDetailsQuery();

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;
  const { email, username, deedsCount, followersCount, followingsCount } = myDetails!;

  return (
    <Paper>
      <Stack className='items-center gap-5'>
        <Stack className='items-center'>
          <div className='avatar placeholder'>
            <div className='w-24 rounded-full bg-neutral text-neutral-content'>
              <span className='text-3xl'>{username[0].toUpperCase()}</span>
            </div>
          </div>
          <span className='font-bold'>{username}</span>
          <span className='text-xs'>{email}</span>
        </Stack>
        <Group className='gap-5'>
          <Stack className='items-center'>
            <span className='text-xl font-bold'>{deedsCount}</span>
            <span className='text-gray-500'>Deeds</span>
          </Stack>
          <Stack className='items-center'>
            <span className='text-xl font-bold'>{followersCount}</span>
            <span className='text-gray-500'>Followers</span>
          </Stack>
          <Stack className='items-center'>
            <span className='text-xl font-bold'>{followingsCount}</span>
            <span className='text-gray-500'>Followers</span>
          </Stack>
        </Group>
        <Group>
          <Link to='/users'>
            <button className='btn btn-square btn-primary btn-sm'>
              <IconSearch className='h-4  w-4' />
            </button>
          </Link>
          <button className='btn btn-square btn-sm'>
            <IconSettings className='h-4 w-4' />
          </button>
          <SignOutButton />
        </Group>
      </Stack>
    </Paper>
  );
}
