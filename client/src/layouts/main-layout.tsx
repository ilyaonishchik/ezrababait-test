import { Outlet } from 'react-router-dom';
import Header from '../components/common/header/header';

export default function MainLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
