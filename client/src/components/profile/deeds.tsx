import { useGetMeQuery } from '../../services/auth';
import { useGetUserDeedsQuery } from '../../services/users';
import { Error, Loader, Paper, Stack } from '../ui';
import { useState } from 'react';
import DeedsItem from './deeds-item';

export default function Deeds() {
  const [page, setPage] = useState<number>(1);
  const [take] = useState<number>(5);

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
        <Stack className='gap-8'>
          {deeds?.map((deed, index) => (
            <>
              <DeedsItem deed={deed} />
              {index !== deeds.length - 1 && <div className='divider'></div>}
            </>
          ))}
          {deedsCount / take > 1 && (
            <div className='join justify-center'>
              <button className='btn join-item' onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
                «
              </button>
              <button className='btn join-item'>{page}</button>
              <button
                className='btn join-item'
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === Math.ceil(deedsCount / take)}
              >
                »
              </button>
            </div>
          )}
        </Stack>
      ) : (
        <span className='text-xl'>You've no deeds yet. Join us in spreading kindness!</span>
      )}
    </Paper>
  );
}
