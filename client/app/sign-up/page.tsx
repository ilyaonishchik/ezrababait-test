import { IconKey, IconMail, IconUser } from '@tabler/icons-react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className='h-full bg-gray-100'>
      <div className='container flex h-full flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-bold'>Join us!</h1>
        <div className='flex flex-col gap-4 rounded-xl bg-white p-8 shadow-xl'>
          <label className='input input-bordered flex items-center gap-2'>
            <IconMail className='h-4 w-4' />
            <input type='text' className='w-full' placeholder='Email' />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <IconUser className='h-4 w-4' />
            <input type='text' className='w-full' placeholder='Username' />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <IconKey className='h-4 w-4' />
            <input type='password' className='w-full' placeholder='Password' />
          </label>
          <div className='flex items-center justify-between'>
            <Link href='/sign-in' className='link text-sm'>
              Already have an account?
            </Link>
            <button className='btn btn-primary'>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
