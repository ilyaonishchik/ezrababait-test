import Link from 'next/link';

export default async function Home() {
  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage: 'url(https://xn--90abfbbceusoncq3a9exe.xn--p1ai/upload/000/u1/003/8881e338.png)',
        backgroundSize: '90%',
        backgroundPosition: 'center 10%',
      }}
    >
      <div className='hero-overlay bg-opacity-80'></div>
      <div className='hero-content text-neutral-content text-center'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>Hello there</h1>
          <p className='mb-5 text-xl'>
            Document your daily acts of goodness, inspire others, and make a difference one deed at a time
          </p>
          <Link href='/sign-in'>
            <button className='btn btn-primary btn-lg'>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
