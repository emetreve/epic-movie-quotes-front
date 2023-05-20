import { PropsType } from './types';
import Image from 'next/image';

const LogIn: React.FC<PropsType> = ({ show }) => {
  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div className='bg-gradient-violet lg:bg-gradient-plain-violet h-full w-full lg:h-[40rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative lg:scale-105'>
        <Image
          onClick={() => show(false)}
          src='/assets/close-btn.png'
          alt='close button'
          width={200}
          height={200}
          className='h-5 w-5 lg:h-7 lg:w-7 right-0 absolute mt-7 mr-8 opacity-50 hover:cursor-pointer'
        />

        <div className='flex flex-col items-center justify-center h-32 mt-14'>
          <h1 className='text-2xl pt-2 lg:text-[2.1rem] lg:mb-1'>
            Log in to your account
          </h1>
          <p className='text-gray-500 text-sm mt-3'>
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className='w-full px-8 text-sm'>
          <div className='flex flex-col mt-1'>
            <label htmlFor='email' className='mb-2'>
              Email <span className='text-red'>*</span>
            </label>
            <input
              id='email'
              placeholder='Enter your email'
              className='bg-input-gray text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded'
            />
            <div className='h-4'>{/* FOR_ERROR */}</div>
          </div>

          <div className='flex flex-col mt-1'>
            <label htmlFor='password' className='mb-2'>
              Password <span className='text-red'>*</span>
            </label>
            <input
              id='password'
              placeholder={
                window.matchMedia('(max-width: 800px)').matches
                  ? 'Password'
                  : 'At least 8 & max.15 lower case characters'
              }
              className='bg-input-gray text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded'
            />
            <div className='h-4'>{/* FOR_ERROR */}</div>
          </div>

          <div className='flex'>
            <div className='flex justify-center items-center'>
              <input
                className='w-4 h-4 inline rounded border-none'
                type='checkbox'
                name='remember'
                id='remember'
              />
              <label className='ml-2 pt-[0.1rem] relative' htmlFor='remember'>
                Remember me
              </label>
            </div>
            <p className='ml-auto underline text-blue-600 hover:cursor-pointer'>
              <p>Forgot password</p>
            </p>
          </div>

          <button className='mt-5 text-white bg-red py-[0.6rem] lg:py-[0.6rem] w-full lg:text-xl rounded-md'>
            Sign in
          </button>
          <button className='text-white mt-3 py-[0.5rem] lg:py-[0.7rem] w-full lg:px-8 rounded-md border lg:text-[1rem] border-white'>
            <Image
              src='/assets/google.png'
              alt='google logo'
              height={16}
              width={16}
              className='inline mr-2'
            />
            Sign in with Google
          </button>
        </form>
        <div className='h-24 flex justify-center items-center'>
          <p className='inline text-xs text-gray-500'>
            Don&apos;t have an account?
          </p>
          <p className='inline-block ml-2 text-sm text-blue-400 underline'>
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
