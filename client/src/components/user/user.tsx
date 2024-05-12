import { useParams } from 'react-router-dom';
import { Paper, Container } from '../ui';
import UserHeader from '../common/user-header';

export default function User() {
  const { userId } = useParams();

  return (
    <Container>
      {/* <Paper>User with id {userId}</Paper> */}
      <UserHeader userId={+userId!} />
      <Paper>Deeds</Paper>
    </Container>
  );
}
