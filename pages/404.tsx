import Image from 'next/image';

const NotFound = () => {
  return (
    <div className='h-screen w-screen bg-gradient-violet pb-20 text-white flex flex-col items-center justify-center'>
      <Image
        src='/assets/ghost.png'
        alt='ghost'
        width={456}
        height={512}
        className='h-32 w-auto'
      />
      <Image
        src='/assets/ghost-ground.png'
        alt='ghost'
        width={4279}
        height={512}
        className='w-24 h-auto mt-7'
      />
      <h1 className='text-bold text-2xl pt-6 pb-4 lg:pt-10 lg:pb-5 lg:text-5xl'>
        Whoops!
      </h1>
      <p className='text-sm lg:text-2xl'>
        We can&apos;t see the page you are looking for
      </p>
      <button className='mt-5 text-white bg-red py-[0.6rem] px-6 lg:px-0 lg:w-[10rem] lg:text-xl rounded-md lg:mt-12'>
        Return home
      </button>
    </div>
  );
};
export default NotFound;
