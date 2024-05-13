import { IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function SettingsButton() {
  return (
    <Link to='/profile/settings'>
      <button className='btn btn-sm'>
        <IconSettings className='h-4 w-4' />
        <span className='hidden sm:block'>Settings</span>
      </button>
    </Link>
  );
}
