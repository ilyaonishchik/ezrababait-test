import { IconCarambola, IconEdit, IconX } from '@tabler/icons-react';
import { Deed } from '../../types/Deed';
import { Group, Loader, Stack } from '../ui';
import { useDeleteDeedMutation, useUpdateDeedMutation } from '../../services/users';
import { useGetMeQuery } from '../../services/auth';
import { useState } from 'react';
import { useFormik } from 'formik';
import Points from '../common/points';

type DeedListItemProps = {
  deed: Deed;
};

export default function DeedsListItem({ deed }: DeedListItemProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const handleToggleEditMode = () => setIsEditMode((prev) => !prev);

  const { data: me } = useGetMeQuery();

  const [deleteDeed, { isLoading }] = useDeleteDeedMutation();
  const handleDeleteDeed = () => deleteDeed({ userId: me?.id, deedId: deed.id });

  const [updateDeed, { isLoading: isUpdateDeedLoading }] = useUpdateDeedMutation();
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      title: deed.title,
      description: deed.description,
      points: deed.points,
    },
    onSubmit: async (values) => {
      await updateDeed({ userId: me?.id, deedId: deed.id, body: values });
      setIsEditMode(false);
    },
  });

  const handleToggleDeedCompleted = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateDeed({ userId: me?.id, deedId: deed.id, body: { completed: e.target.checked } });

  return (
    <Stack key={deed.id} className='gap-2'>
      <Group className='items-center justify-between'>
        {isEditMode ? (
          <input
            type='number'
            name='points'
            className='input input-xs input-bordered max-w-14'
            value={values.points}
            onChange={handleChange}
          />
        ) : (
          <Points value={deed.points} />
        )}
        <Group className='justify-end'>
          {isEditMode && (
            <button className='btn btn-primary btn-sm self-end' onClick={handleSubmit} disabled={isUpdateDeedLoading}>
              {isUpdateDeedLoading ? <Loader /> : 'Save'}
            </button>
          )}
          <button className='btn btn-square btn-sm' onClick={handleToggleEditMode}>
            <IconEdit />
          </button>
          <button onClick={handleDeleteDeed} className='btn btn-square btn-sm bg-red-300'>
            {isLoading ? <Loader /> : <IconX />}
          </button>
        </Group>
      </Group>
      <Group>
        <input
          type='checkbox'
          name='completed'
          checked={deed.completed}
          onChange={handleToggleDeedCompleted}
          className='checkbox-primary checkbox'
        />
        {isEditMode ? (
          <input
            type='text'
            name='title'
            value={values.title}
            onChange={handleChange}
            className='input input-bordered'
          />
        ) : (
          <span className='text-lg font-bold'>{deed.title}</span>
        )}
      </Group>
      {isEditMode ? (
        <input
          type='text'
          name='description'
          value={values.description}
          onChange={handleChange}
          className='input input-bordered'
        />
      ) : (
        <span className=''>{deed.description}</span>
      )}
    </Stack>
  );
}
