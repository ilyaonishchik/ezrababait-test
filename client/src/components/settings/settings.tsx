import { Container, Input, Paper, Stack } from '../ui';

export default function Settings() {
  return (
    <Container>
      <Paper title='Change username'>
        <Stack>
          <Input label='Username' />
          <button className='btn btn-primary self-end'>Save</button>
        </Stack>
      </Paper>
      <Paper title='Delete account'>
        <button className='btn btn-error w-full'>Delete</button>
      </Paper>
    </Container>
  );
}
