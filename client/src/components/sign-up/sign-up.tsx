import SignUpForm from './sign-up-form';

export default function SignUp() {
  return (
    <div className='container flex h-screen justify-center'>
      <div className='flex h-full max-w-[400px] flex-col items-center justify-center gap-4'>
        <div className='text-3xl'>Join us!</div>
        <SignUpForm />
      </div>
    </div>
  );
}
