import { IconCarambola, IconEdit, IconX } from '@tabler/icons-react';
import { useGetMeQuery } from '../../services/auth';
import { useGetUserDeedsQuery } from '../../services/users';
import { Error, Group, Loader, Paper, Stack } from '../ui';
import { useState } from 'react';

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

  console.log(deedsCount / take);

  return (
    <Paper>
      <Stack className='gap-8'>
        {deeds?.map((deed, index) => (
          <Stack key={deed.id} className='gap-2'>
            <Group className='justify-between'>
              <Group className='gap-2'>
                <IconCarambola fill='#fde047' />
                <span>{deed.points}</span>
              </Group>
              <Group className='justify-end gap-2'>
                <button className='btn btn-square btn-sm'>
                  <IconEdit />
                </button>
                <button className='btn btn-square btn-sm bg-red-300'>
                  <IconX />
                </button>
              </Group>
            </Group>
            <span className='text-lg font-bold'>{deed.title}</span>
            <span className=''>{deed.description}</span>
            {index !== deeds.length - 1 && <div className='divider'></div>}
          </Stack>
        ))}
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
      </Stack>
    </Paper>
  );
}
