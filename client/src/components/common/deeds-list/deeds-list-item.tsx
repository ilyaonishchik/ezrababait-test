import { Deed } from '../../../types/entities/Deed';
import { Group, Stack } from '../../ui';
import Points from '../points';
import { useUpdateDeedMutation } from '../../../services/users';
import UpdateDeedButton from './update-deed-button';
import DeleteDeedButton from './delete-deed-button';

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
            <UpdateDeedButton userId={userId} deed={deed} />
            <DeleteDeedButton userId={userId} deedId={deed.id} />
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
          <span className={`text-md font-bold sm:text-lg ${deed.completed && 'line-through'}`}>{deed.title}</span>
        </Group>
        <span className={`sm:text-md text-sm  ${deed.completed && 'line-through'}`}>{deed.description}</span>
      </Stack>
    </Stack>
  );
}
