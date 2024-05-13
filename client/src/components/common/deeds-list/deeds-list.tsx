import { IconExclamationCircle } from '@tabler/icons-react';
import { usePagination } from '../../../hooks/usePagination';
import { useGetMeQuery } from '../../../services/api';
import { useGetUserDeedsQuery, useGetUserFollowingStatusQuery } from '../../../services/api';
import { Error, Group, Pagination, Paper, Stack } from '../../ui';
import DeedsListItem from './deeds-list-item';
import DeedsListSkeleton from './deeds-list-skeleton';

type DeedsListProps = {
  userId: number;
};

export default function DeedsList({ userId }: DeedsListProps) {
  const { page, setPage, take, setTake } = usePagination({ initialPage: 1, initialTake: 5 });

  const {
    isLoading: isGetUserDeedsLoading,
    error: getUserDeedsError,
    data: getUserDeedsData,
  } = useGetUserDeedsQuery({ userId, page, take });

  const { isLoading: isGetMeLoading, error: getMeError, data: getMeData } = useGetMeQuery();

  const {
    isLoading: isGetUserFollowingStatusLoading,
    error: getUserFollowingStatusError,
    data: getUserFollowingStatusData,
  } = useGetUserFollowingStatusQuery({ userId });

  if (isGetUserDeedsLoading || isGetMeLoading || isGetUserFollowingStatusLoading) return <DeedsListSkeleton />;
  if (getUserDeedsError || getMeError || getUserFollowingStatusError)
    return <Error error={getUserDeedsError || getMeError || getUserFollowingStatusError} />;

  const [deeds, count] = getUserDeedsData!;

  const me = getMeData!;

  const { isFollowing } = getUserFollowingStatusData!;

  const editable = userId === me.id;

  return (
    <Paper title='Deeds'>
      {!editable && !isFollowing ? (
        <Group className='text-blue-700'>
          <IconExclamationCircle />
          <span className='font-semibold italic'>Follow to get access</span>
        </Group>
      ) : !count ? (
        <Group className='text-blue-700'>
          <span className='font-semibold italic'>There are no deeds yet</span>
        </Group>
      ) : (
        <Stack className='gap-5'>
          <div>
            {deeds.map((deed, index) => (
              <div key={deed.id}>
                <DeedsListItem deed={deed} userId={userId} editable={editable} />
                {index !== deeds.length - 1 && <div className='divider'></div>}
              </div>
            ))}
          </div>
          <Pagination paginationProps={{ count, page, setPage, take, setTake }} />
        </Stack>
      )}
    </Paper>
  );
}
