import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Deed } from '../../../types/Deed';
import { Group, Loader, Modal, Stack } from '../../ui';
import Points from '../points';
import { useDeleteDeedMutation, useUpdateDeedMutation } from '../../../services/users';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { useFormik } from 'formik';

type DeedsListItemProps = {
  deed: Deed;
  userId: number;
  editable: boolean;
};

export default function DeedsListItem({ deed, userId, editable }: DeedsListItemProps) {
  const [updateDeed, { isLoading: isUpdateDeedLoading }] = useUpdateDeedMutation();
  const handleToggleCompleted = () => updateDeed({ userId, deedId: deed.id, body: { completed: !deed.completed } });

  const [deleteDeed, { isLoading: isDeleteDeedLoading }] = useDeleteDeedMutation();
  const handleDeleteDeed = () => deleteDeed({ userId, deedId: deed.id });

  const [opened, { open, close }] = useDisclosure(false);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: deed.title,
      description: deed.description,
      points: deed.points,
    },
    onSubmit: async (values) => {
      await updateDeed({ userId, deedId: deed.id, body: values });
      close();
    },
  });

  return (
    <>
      <Modal title='Edit deed' opened={opened} onClose={close}>
        <Stack>
          <input
            type='text'
            name='title'
            placeholder='title'
            className='input input-bordered'
            value={values.title}
            onChange={handleChange}
          />
          <textarea
            name='description'
            placeholder='description'
            className='textarea textarea-bordered'
            value={values.description}
            onChange={handleChange}
          />
          <input
            type='number'
            name='points'
            placeholder='points'
            className='input input-bordered'
            value={values.points}
            onChange={handleChange}
          />
          <button type='button' className='btn btn-primary self-end' onClick={() => handleSubmit()}>
            {isUpdateDeedLoading ? <Loader /> : 'Save'}
          </button>
        </Stack>
      </Modal>
      <Stack>
        <Group className='justify-between'>
          <Points value={deed.points} />
          {editable && (
            <Group>
              <button className='btn btn-square  btn-sm'>
                <IconEdit className='h-4 w-4' onClick={open} />
              </button>
              <button className='btn btn-square btn-error btn-sm' onClick={handleDeleteDeed}>
                {isDeleteDeedLoading ? <Loader className='text-white' /> : <IconTrash className='h-4 w-4 text-white' />}
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
    </>
  );
}
