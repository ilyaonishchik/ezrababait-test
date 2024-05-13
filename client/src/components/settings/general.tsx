import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';
import { User } from '../../types/entities';
import { Paper } from '../ui';

type GeneralProps = {
  me: User;
};

export default function General({ me }: GeneralProps) {
  return (
    <Paper title='General info'>
      <table className='table'>
        <tbody>
          <tr>
            <th>Username</th>
            <td>{me.username}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{me.email}</td>
          </tr>
          <tr>
            <th>Verified</th>
            <td>
              {me.verified ? (
                <IconCircleCheckFilled className='text-green-500' />
              ) : (
                <IconCircleXFilled className='text-red-500' />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </Paper>
  );
}
