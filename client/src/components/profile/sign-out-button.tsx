import { useNavigate } from 'react-router-dom';
import { useSignOutMutation } from '../../services/auth';

export default function SignOutButton() {
  const [signOut] = useSignOutMutation();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut()
      .then(() => navigate('/'))
      .catch((e) => console.log(e));
  };

  return <button onClick={handleSignOut}>Sign out</button>;
}
