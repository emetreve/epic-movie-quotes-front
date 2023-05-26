import Image from 'next/image';
import { useUiContext } from '@/store';

const ExpiredWarning = () => {
  const { showExpired, showForgot } = useUiContext();

  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div className='bg-gradient-violet lg:bg-gradient-plain-violet h-full w-full lg:h-[26rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative lg:scale-105'>
        <Image
          onClick={() => {
            showExpired(false);
          }}
          src='/assets/close-btn.png'
          alt='close button'
          width={200}
          height={200}
          className='hidden lg:block h-5 w-5 lg:h-7 lg:w-7 right-0 absolute mt-7 mr-8 opacity-50 hover:cursor-pointer'
        />
        <div className='rounded-2xl gap-2 flex flex-col items-center justify-center h-[23rem] mt-20 lg:mt-5 bg-gradient-gray mx-8 lg:mx-0 lg:bg-gradient-plain-violet'>
          <Image
            src='/assets/expired-warn.png'
            alt='email logo'
            height={500}
            width={500}
            className='inline mr-2 h-16 w-auto'
          />
          <h1 className='text-2xl pt-2 lg:text-[2.1rem] lg:mb-1'>
            Link expired!
          </h1>
          <p className='mt-3 text-center text-sm lg:text-lg px-6 lg:px-0'>
            Login link has expired, because you haven&apos;t used it
          </p>
          <button
            onClick={() => {
              showExpired(false);
              showForgot(true);
            }}
            className='mt-10 text-white bg-red py-2 lg:py-3 lg:text-xl px-16 lg:px-[7.4rem] rounded-md'
          >
            Request another link
          </button>
        </div>
      </div>
    </div>
  );
};
export default ExpiredWarning;
