import SignInForm from './sign-in-form';

export default function SignIn() {
  return (
    <div className='container flex h-screen justify-center'>
      <div className='flex h-full max-w-[400px] flex-col items-center justify-center gap-4'>
        <div className='text-3xl font-bold text-blue-700'>Welcome back!</div>
        <SignInForm />
      </div>
    </div>
  );
}
