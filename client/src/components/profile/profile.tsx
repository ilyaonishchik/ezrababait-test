import { Stack } from '../ui';
import CreateDeed from './create-deed';
import Deeds from './deeds';
import ProfileHeader from './profile-header';

export default function Profile() {
  return (
    <Stack className='m-auto max-w-[800px] gap-5 pl-2 pr-2 pt-2'>
      <ProfileHeader />
      <CreateDeed />
      <Deeds />
    </Stack>
  );
}
