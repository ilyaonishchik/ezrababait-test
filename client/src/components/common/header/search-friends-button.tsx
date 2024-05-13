import { IconSearch } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function SearchFriendsButton() {
  return (
    <Link to='/users'>
      <button className='btn btn-primary btn-sm'>
        <IconSearch className=' h-4  w-4' />
        <span className='hidden md:block'>Search friends</span>
      </button>
    </Link>
  );
}
