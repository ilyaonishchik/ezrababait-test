import { Link } from 'react-router-dom';
import { useGetMeQuery } from '../../services/auth';

export default function Home() {
  const { data: me } = useGetMeQuery({});

  return (
    <div>
      <Link to={me ? '/profile' : '/sign-in'}>
        <button>Get started</button>
      </Link>
    </div>
  );
}
