import { IconSearch } from '@tabler/icons-react';
import { Group, Paper } from '../ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Search() {
  const queryParams = new URLSearchParams(useLocation().search);
  const query = queryParams.get('query');

  const [search, setSearch] = useState(query || '');

  const navigate = useNavigate();

  const handleSearch = () => {
    queryParams.set('query', search);
    navigate(`/users?${queryParams.toString()}`, { replace: true });
  };

  return (
    <Paper>
      <Group>
        <input
          className='input input-bordered w-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Enter username'
        />
        <button className='btn btn-square btn-primary' onClick={handleSearch}>
          <IconSearch />
        </button>
      </Group>
    </Paper>
  );
}
