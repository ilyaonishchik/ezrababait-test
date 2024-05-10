import { Route, Routes } from 'react-router-dom';
import { useGetMeQuery } from './services/auth';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';
import Home from './components/home/home';
import Profile from './components/profile/profile';
import Loader from './components/ui/loader';
import NotFound from './components/not-found/not-found';

function App() {
  const { isLoading, data: me } = useGetMeQuery({});

  if (isLoading) return <Loader />;

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        {me ? (
          <Route path='/profile' element={<Profile />} />
        ) : (
          <>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </>
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
