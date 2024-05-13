import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '../ui/alert';
import { IconUser, IconKey, IconMail } from '@tabler/icons-react';
import { RTKQueryError } from '../../types/RTK/RTKQueryError';
import { useSignUpMutation } from '../../services/api';

export default function SignUpForm() {
  const navigate = useNavigate();

  const [signUp, { isLoading, error }] = useSignUpMutation();

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').min(2, 'Too short').max(50, 'Too long').required('Required'),
      username: Yup.string().min(2, 'Too short').max(50, 'Too long').required('Required'),
      password: Yup.string().min(2, 'Too short').required('Required'),
    }),
    onSubmit: async (values) => {
      const { error } = await signUp(values);
      if (error) {
        const { data } = error as RTKQueryError;
        throw new Error(data.message);
      }
      navigate('/profile');
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 rounded-xl bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-1'>
          <label className='input input-bordered flex items-center gap-2'>
            <IconMail className='h-4 w-4' />
            <input
              className='w-full'
              type='text'
              name='email'
              placeholder='Email'
              value={values.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && touched.email && <Alert variant='error'>{errors.email}</Alert>}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='input input-bordered flex items-center gap-2'>
            <IconUser className='h-4 w-4' />
            <input
              className='w-full'
              type='text'
              name='username'
              placeholder='Username'
              value={values.username}
              onChange={handleChange}
            />
          </label>
          {errors.username && touched.username && <Alert variant='error'>{errors.username}</Alert>}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='input input-bordered flex items-center gap-2'>
            <IconKey className='h-4 w-4' />
            <input
              className='w-full'
              type='password'
              name='password'
              placeholder='Password'
              value={values.password}
              onChange={handleChange}
            />
          </label>
          {errors.username && touched.username && <Alert variant='error'>{errors.password}</Alert>}
        </div>
        <div>
          <Link to='/sign-in' className='link text-xs'>
            Already have an account?
          </Link>
        </div>
        <button type='submit' className='btn btn-primary' disabled={isLoading}>
          {isLoading ? <span className='loading loading-spinner'></span> : 'Sign up'}
        </button>
      </form>
      {error && (
        <div role='alert' className='alert alert-error max-w-full'>
          <span>{error.data.message}</span>
        </div>
      )}
    </>
  );
}
