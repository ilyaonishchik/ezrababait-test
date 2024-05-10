import Link from 'next/link';
import { IconUser, IconKey } from '@tabler/icons-react';

export default function SignInPage() {
  return (
    <div className='h-full bg-gray-100'>
      <div className='container flex h-full flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-bold'>Welcome back!</h1>
        <div className='flex max-w-[400px] flex-col gap-4 rounded-xl bg-white p-8 shadow-xl'>
          <label className='input input-bordered flex items-center gap-2'>
            <IconUser className='h-4 w-4' />
            <input type='text' placeholder='Username' />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <IconKey className='h-4 w-4' />
            <input type='password' placeholder='Password' />
          </label>
          <div className='flex items-center justify-between'>
            <Link href='/sign-up' className='link text-sm'>
              Don&apos;t have an account?
            </Link>
            <button className='btn btn-primary'>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}
