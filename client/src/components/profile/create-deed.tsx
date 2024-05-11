import { IconPlus } from '@tabler/icons-react';
import { Group, Paper, Stack } from '../ui';
import { useFormik } from 'formik';
import { useCreateDeedMutation } from '../../services/users';
import * as Yup from 'yup';
import { useGetMeQuery } from '../../services/auth';

export default function CreateDeed() {
  const { data: me } = useGetMeQuery();
  const [createDeed] = useCreateDeedMutation();

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      title: '',
      description: '',
      points: 0,
    },
    validationSchema: Yup.object().shape({}),
    onSubmit: async (values) => {
      const { error } = await createDeed({ userId: me?.id, ...values });
      if (error) console.log(error.message);
    },
  });

  return (
    <Paper>
      <div className='mb-2 text-xl font-bold'>Add new good deed!</div>
      <form onSubmit={handleSubmit}>
        <Stack className='gap-2'>
          <Group className='gap-2'>
            <input
              type='text'
              name='title'
              value={values.title}
              onChange={handleChange}
              placeholder='Title'
              className='input input-bordered w-full'
            />
            <input
              type='number'
              name='points'
              value={values.points}
              onChange={handleChange}
              placeholder='Points'
              className='input input-bordered w-full basis-1/4'
            />
          </Group>
          <textarea
            name='description'
            value={values.description}
            onChange={handleChange}
            placeholder='Description'
            className='textarea textarea-bordered w-full'
          ></textarea>
          <button type='submit' className='btn btn-primary self-end'>
            <IconPlus className='h-4 w-4' />
            Add
          </button>
        </Stack>
      </form>
    </Paper>
  );
}
