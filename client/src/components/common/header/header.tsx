import { Link } from 'react-router-dom';
import { Avatar, Container, Group } from '../../ui';
import { IconHome } from '@tabler/icons-react';
import SignOutButton from './sign-out-button';
import SettingsButton from './settings-button';
import SearchFriendsButton from './search-friends-button';

export default function Header() {
  return (
    <header className='bg-white shadow-md'>
      <Container>
        <Group className='justify-between'>
          <Link to='/'>
            <button className='btn btn-square'>
              <IconHome />
            </button>
          </Link>
          <Group>
            <SearchFriendsButton />
            <SettingsButton />
            <SignOutButton />
            <Link to='/profile'>
              <Avatar className='w-10'>
                <span className='text-xl'>I</span>
              </Avatar>
            </Link>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
