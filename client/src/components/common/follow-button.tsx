import { useGetUserFollowingStatusQuery, useToggleFollowingMutation } from '../../services/api';
import { Error, Loader } from '../ui';

type FollowButtonProps = {
  userId: number;
};

export default function FollowButton({ userId }: FollowButtonProps) {
  const { isLoading, error, data: followingStatus } = useGetUserFollowingStatusQuery({ userId });

  const [toggleFollowing] = useToggleFollowingMutation();

  const handleToggleFollowing = () => toggleFollowing({ userId });

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  const { isFollowing } = followingStatus!;

  if (isFollowing)
    return (
      <button className='btn btn-outline btn-primary btn-sm w-24' onClick={handleToggleFollowing}>
        Unfollow
      </button>
    );

  return (
    <button className='btn btn-primary btn-sm w-24' onClick={handleToggleFollowing}>
      Follow
    </button>
  );
}
