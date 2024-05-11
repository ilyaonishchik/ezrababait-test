import { IconCarambola, IconEdit, IconX } from '@tabler/icons-react';
import { Deed } from '../../types/Deed';
import { Group, Loader, Stack } from '../ui';
import { useDeleteDeedMutation } from '../../services/users';
import { useGetMeQuery } from '../../services/auth';

type DeedProps = {
  deed: Deed;
};

export default function DeedsItem({ deed }: DeedProps) {
  const { data: me } = useGetMeQuery();
  const [deleteDeed, { isLoading }] = useDeleteDeedMutation();

  const handleDeleteDeed = () => deleteDeed({ userId: me?.id, deedId: deed.id });

  return (
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
          <button onClick={handleDeleteDeed} className='btn btn-square btn-sm bg-red-300'>
            {isLoading ? <Loader /> : <IconX />}
          </button>
        </Group>
      </Group>
      <span className='text-lg font-bold'>{deed.title}</span>
      <span className=''>{deed.description}</span>
    </Stack>
  );
}
