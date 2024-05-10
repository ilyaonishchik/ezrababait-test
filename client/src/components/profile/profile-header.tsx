import { useGetMyDetailsQuery } from '../../services/users';
import Error from '../ui/error';
import Loader from '../ui/loader';

export default function ProfileHeader() {
  const { isLoading, error, data: myDetails } = useGetMyDetailsQuery();

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;
  const { email, username, deedsCount, followersCount, followingsCount } = myDetails!;

  return (
    <div className='flex flex-col items-center gap-5 rounded-xl bg-white p-8 shadow-md'>
      <div className='flex flex-col items-center'>
        <div className='avatar placeholder'>
          <div className='bg-neutral text-neutral-content w-24 rounded-full'>
            <span className='text-3xl'>I</span>
          </div>
        </div>
        <span className='font-bold'>{username}</span>
        <span className='text-xs'>{email}</span>
      </div>
      <div className='flex items-center gap-5'>
        <div className='flex flex-col items-center'>
          <span className='text-xl font-bold'>{deedsCount}</span>
          <span className='text-gray-500'>Deeds</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-xl font-bold'>{followersCount}</span>
          <span className='text-gray-500'>Followers</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-xl font-bold'>{followingsCount}</span>
          <span className='text-gray-500'>Followers</span>
        </div>
      </div>
    </div>
  );
}
