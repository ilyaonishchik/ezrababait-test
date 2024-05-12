import { useParams } from 'react-router-dom';
import { Paper, Container } from '../ui';

export default function User() {
  const { userId } = useParams();

  return (
    <Container>
      <Paper>User with id {userId}</Paper>
      <Paper>Deeds</Paper>
    </Container>
  );
}
