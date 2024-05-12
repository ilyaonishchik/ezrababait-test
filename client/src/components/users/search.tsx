import { IconSearch } from '@tabler/icons-react';
import { Group, Paper } from '../ui';

export default function Search() {
  return (
    <Paper className='p-4'>
      <Group>
        <input className='input input-bordered w-full' placeholder='Enter username' />
        <button className='btn btn-square btn-primary'>
          <IconSearch />
        </button>
      </Group>
    </Paper>
  );
}
