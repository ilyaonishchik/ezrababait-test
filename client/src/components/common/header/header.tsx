import { Link } from 'react-router-dom';
import { Container, Group } from '../../ui';
import { IconHome, IconSearch, IconSettings } from '@tabler/icons-react';
import SignOutButton from './sign-out-button';

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
            <Link to='/users'>
              <button className='btn btn-primary btn-sm'>
                <IconSearch className='h-4  w-4' />
                Search friends
              </button>
            </Link>
            <button className='btn btn-sm'>
              <IconSettings className='h-4 w-4' />
              Settings
            </button>
            <SignOutButton />
            <Link to='/profile'>
              <div className='avatar placeholder'>
                <div className='w-10 rounded-full bg-neutral text-neutral-content'>
                  <span className='text-xl'>I</span>
                </div>
              </div>
            </Link>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
