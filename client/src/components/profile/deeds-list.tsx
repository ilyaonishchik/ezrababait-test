import { useGetMeQuery } from '../../services/auth';
import { useGetUserDeedsQuery } from '../../services/users';
import { Error, Loader, Pagination, Paper, Stack } from '../ui';
import DeedsListItem from './deeds-list-item';
import { usePagination } from '../../hooks/usePagination';

export default function DeedsList() {
  const { page, setPage, take, setTake } = usePagination({ initialPage: 1, initialTake: 5 });

  const { isLoading: getMeIsLoading, error: getMeError, data: me } = useGetMeQuery();
  const {
    isLoading: getUserDeedsIsLoading,
    error: getUserDeedsError,
    data: getUserDeedsData,
  } = useGetUserDeedsQuery({ userId: me?.id, page, take });

  if (getMeIsLoading || getUserDeedsIsLoading) return <Loader />;
  if (getMeError || getUserDeedsError) return <Error error={getMeError || getUserDeedsError} />;

  const [deeds, deedsCount] = getUserDeedsData!;

  return (
    <Paper>
      {deedsCount ? (
        <Stack className='gap-4'>
          {deeds?.map((deed, index) => (
            <div key={deed.id}>
              <DeedsListItem deed={deed} />
              {index !== deeds.length - 1 && <div className='divider'></div>}
            </div>
          ))}
          {deedsCount / take > 1 && (
            <Pagination paginationProps={{ count: deedsCount, page, setPage, take, setTake }} />
          )}
        </Stack>
      ) : (
        <span className='text-xl'>You've no deeds yet. Join us in spreading kindness!</span>
      )}
    </Paper>
  );
}
