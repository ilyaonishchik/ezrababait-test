import { Route, Routes } from 'react-router-dom';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';
import Home from './components/home/home';
import Profile from './components/profile/profile';
import NotFound from './components/not-found/not-found';
import UnauthorizedRoute from './components/unauthorized-route';
import AuthorizedRoute from './components/authorized-route';
import Users from './components/users/users';
import User from './components/user/user';
import MainLayout from './layouts/main-layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<MainLayout />}>
        <Route
          path='/profile'
          element={
            <AuthorizedRoute>
              <Profile />
            </AuthorizedRoute>
          }
        />
        <Route
          path='/users'
          element={
            <AuthorizedRoute>
              <Users />
            </AuthorizedRoute>
          }
        />
        <Route
          path='/users/:userId'
          element={
            <AuthorizedRoute>
              <User />
            </AuthorizedRoute>
          }
        />
      </Route>
      <Route
        path='/sign-in'
        element={
          <UnauthorizedRoute>
            <SignIn />
          </UnauthorizedRoute>
        }
      />
      <Route
        path='/sign-up'
        element={
          <UnauthorizedRoute>
            <SignUp />
          </UnauthorizedRoute>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
