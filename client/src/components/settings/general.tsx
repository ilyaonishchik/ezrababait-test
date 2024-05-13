import { User } from '../../types/entities';
import { Paper, Stack } from '../ui';

type GeneralProps = {
  me: User;
};

export default function General({ me }: GeneralProps) {
  return (
    <Paper title='General info'>
      <Stack>
        <div>{me.username}</div>
        <div>{me.email}</div>
      </Stack>
    </Paper>
  );
}
