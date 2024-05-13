import { Link } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../../services/users';
import { Loader, Paper, Stack, Error } from '../ui';
import Points from './points';
import { ChildrenProps } from '../../types/props/ChildrenProps';
import FollowButton from './follow-button';

type UserHeaderProps = {
  userId: number;
  withFollowButton?: boolean;
};

export default function UserHeader({ userId, withFollowButton }: UserHeaderProps) {
  const { isLoading, error, data: myDetails } = useGetUserDetailsQuery({ userId });

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;
  const { email, username, deedsCount, followersCount, followingsCount, points } = myDetails!;

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
          <Points value={points} />
        </Stack>
        <div className='grid grid-cols-3 gap-5'>
          <Stack className='items-center'>
            <span className='text-xl font-bold'>{deedsCount}</span>
            <span className='text-gray-500'>Deeds</span>
          </Stack>
          <Link to={`/users?followingId=${userId}`}>
            <Stack className='items-center'>
              <span className='text-xl font-bold'>{followersCount}</span>
              <span className='text-gray-500'>Followers</span>
            </Stack>
          </Link>
          <Link to={`/users?followerId=${userId}`}>
            <Stack className='items-center'>
              <span className='text-xl font-bold'>{followingsCount}</span>
              <span className='text-gray-500'>Followings</span>
            </Stack>
          </Link>
        </div>
        {withFollowButton && <FollowButton userId={userId} />}
      </Stack>
    </Paper>
  );
}
