import { Link } from 'react-router-dom';
import { Stack } from '../ui';

export default function Home() {
  return (
    <div className='flex h-screen w-screen'>
      <div className='container flex items-center justify-center text-center'>
        <Stack>
          <h1 className='mb-2 text-7xl font-bold'>
            Welcome to <span className='text-blue-700'>Good Deeds</span> Diary
          </h1>
          <p className='mb-6 text-xl font-semibold text-gray-600'>
            Track your acts of kindness and make a positive impact!
          </p>
          <Link to='/profile' className='self-center'>
            <button className='btn btn-primary btn-lg'>Get started</button>
          </Link>
        </Stack>
      </div>
    </div>
  );
}
