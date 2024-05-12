import { IconPlus } from '@tabler/icons-react';
import { Paper, Stack } from '../ui';
import { useFormik } from 'formik';
import { useCreateDeedMutation } from '../../services/users';
import * as Yup from 'yup';
import { useGetMeQuery } from '../../services/auth';

export default function CreateDeed() {
  const { data: me } = useGetMeQuery();
  const [createDeed] = useCreateDeedMutation();

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      title: '',
      description: '',
      points: 1,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      points: Yup.number().required('Required').min(1, 'Must be greater than 0'),
    }),
    onSubmit: async (values) => {
      const { error } = await createDeed({ userId: me?.id, ...values });
      if (error) console.log(error.message);
    },
  });

  return (
    <Paper>
      <div className='mb-5 text-xl font-bold'>Add new good deed!</div>
      <form onSubmit={handleSubmit}>
        <Stack className='gap-4'>
          <div className='flex items-start gap-4'>
            <Stack className='w-3/4'>
              <label className='font-semibold'>Title</label>
              <input
                type='text'
                name='title'
                value={values.title}
                onChange={handleChange}
                placeholder='Title'
                className='input input-bordered'
              />
              {errors.title && touched.title && <span className='italic text-red-500'>{errors.title}</span>}
            </Stack>
            <Stack className='h-full items-start justify-start'>
              <label className='font-semibold'>Points</label>
              <input
                type='number'
                name='points'
                value={values.points}
                onChange={handleChange}
                placeholder='Points'
                className='input input-bordered'
              />
              {errors.points && touched.points && <span className='italic text-red-500'>{errors.points}</span>}
            </Stack>
          </div>
          <Stack>
            <label className='font-semibold'>Description</label>
            <textarea
              name='description'
              value={values.description}
              onChange={handleChange}
              placeholder='Description'
              className='textarea textarea-bordered w-full'
            ></textarea>
            {errors.description && touched.description && (
              <span className='italic text-red-500'>{errors.description}</span>
            )}
          </Stack>
          <button type='submit' className='btn btn-primary self-end'>
            <IconPlus className='h-4 w-4' />
            Add
          </button>
        </Stack>
      </form>
    </Paper>
  );
}
