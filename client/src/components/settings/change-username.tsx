import { useFormik } from 'formik';
import { useUpdateMeMutation } from '../../services/api';
import { Input, Loader, Paper, Stack } from '../ui';
import * as Yup from 'yup';

type ChangeUsernameProps = {
  username: string;
};

export default function ChangeUsername({ username }: ChangeUsernameProps) {
  const [updateMe, { isLoading: isUpdateMeLoading }] = useUpdateMeMutation();

  const { values, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: { username },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await updateMe(values);
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <Paper title='Change username'>
      <Stack>
        <Input
          label='Username'
          name='username'
          placeholder='username'
          value={values.username}
          onChange={handleChange}
          error={errors.username}
          touched={touched.username}
        />
        <button type='button' className='btn btn-primary self-end' onClick={() => handleSubmit()}>
          {isUpdateMeLoading ? <Loader className='text-white' /> : 'Save'}
        </button>
      </Stack>
    </Paper>
  );
}
