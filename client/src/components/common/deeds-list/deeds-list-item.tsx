import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Deed } from '../../../types/Deed';
import { Group, Stack } from '../../ui';
import Points from '../points';
import { useUpdateDeedMutation } from '../../../services/users';

type DeedsListItemProps = {
  deed: Deed;
  userId: number;
  editable: boolean;
};

export default function DeedsListItem({ deed, userId, editable }: DeedsListItemProps) {
  const [updateDeed] = useUpdateDeedMutation();
  const handleToggleCompleted = () => updateDeed({ userId, deedId: deed.id, body: { completed: !deed.completed } });

  return (
    <Stack>
      <Group className='justify-between'>
        <Points value={deed.points} />
        {editable && (
          <Group>
            <button className='btn btn-square  btn-sm'>
              <IconEdit className='h-4 w-4' />
            </button>
            <button className='btn btn-square btn-error btn-sm'>
              <IconTrash className='h-4 w-4 text-white' />
            </button>
          </Group>
        )}
      </Group>
      <Stack>
        <Group>
          <input
            type='checkbox'
            className='checkbox-primary checkbox'
            checked={deed.completed}
            onChange={handleToggleCompleted}
          />
          <span className={`text-lg font-bold ${deed.completed && 'line-through'}`}>{deed.title}</span>
        </Group>
        <span className={`${deed.completed && 'line-through'}`}>{deed.description}</span>
      </Stack>
    </Stack>
  );
}
