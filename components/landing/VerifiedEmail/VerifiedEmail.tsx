import Image from 'next/image';
import { useVerifiedEmail } from '@/hooks';

const VerifiedEmail: React.FC = () => {
  const { handleClick } = useVerifiedEmail();

  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div className='bg-gradient-violet lg:bg-gradient-plain-violet h-full w-full lg:h-[40rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative lg:scale-105'>
        <div className='rounded-2xl gap-2 flex flex-col items-center justify-center h-[23rem] mt-20 bg-gradient-gray mx-8 lg:bg-gradient-plain-violet'>
          <Image
            src='/assets/success-email.png'
            alt='email logo'
            height={500}
            width={500}
            className='inline mr-2 h-14 w-auto'
          />
          <h1 className='text-2xl pt-2 lg:text-[2.1rem] lg:mb-1'>Thank you!</h1>
          <p className='mt-3 text-center text-sm'>
            Your account has been activated.
          </p>
          <button
            onClick={handleClick}
            className='mt-10 text-white bg-red py-2 lg:py-3 lg:text-xl px-6 lg:px-5 rounded-md'
          >
            Log in to your account
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifiedEmail;
