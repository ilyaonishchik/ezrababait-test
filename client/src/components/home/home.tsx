import { Link } from 'react-router-dom';
import { useGetMeQuery } from '../../services/auth';
import { Paper, Stack } from '../ui';

export default function Home() {
  const { data: me } = useGetMeQuery();

  return (
    <div className='flex h-screen items-center justify-center'>
      <Paper className='text-center'>
        <div className='mb-2 text-3xl font-bold'>Welcome to Good Deeds Diary</div>
        <div className='mb-6'>Track your acts of kindness and make a positive impact!</div>
        <Link to={me ? '/profile' : '/sign-in'}>
          <button className='btn btn-primary'>Start spreading kindness</button>
        </Link>
      </Paper>
    </div>
  );
}
