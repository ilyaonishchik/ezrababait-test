import { useParams } from 'react-router-dom';
import { Container } from '../ui';
import UserHeader from '../common/user-header';
import DeedsList from '../common/deeds-list/deeds-list';

export default function User() {
  const { userId } = useParams();

  return (
    <Container>
      <UserHeader userId={+userId!} withFollowButton={true} />
      <DeedsList userId={+userId!} />
    </Container>
  );
}
