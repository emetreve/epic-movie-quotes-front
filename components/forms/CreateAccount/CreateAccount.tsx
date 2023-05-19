import { PropsType } from './types';
import Image from 'next/image';

const CreateAccount: React.FC<PropsType> = ({ show }) => {
  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div
        className={`${
          window.matchMedia('(max-width: 800px)').matches
            ? 'bg-gradient-violet'
            : 'bg-violet'
        } h-full w-full lg:h-[45rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative`}
      >
        <Image
          onClick={() => show(false)}
          src='/assets/close-btn.png'
          alt='close button'
          width={200}
          height={200}
          className='h-5 w-5 lg:h-7 lg:w-7 right-0 absolute mt-7 mr-8 opacity-50 hover:cursor-pointer'
        />

        <div className='flex flex-col items-center justify-center h-32 mt-6'>
          <h1 className='text-2xl pt-2'>Create an account</h1>
          <p className='text-gray-500 text-sm mt-3'>Start your journey!</p>
        </div>

        <form className='w-full px-8 text-sm'>
          <div className='flex flex-col'>
            <label htmlFor='name' className='mb-2'>
              Name <span className='text-red'>*</span>
            </label>
            <input
              id='name'
              placeholder={
                window.matchMedia('(max-width: 800px)').matches
                  ? 'Enter your name'
                  : 'At least 3 & max.15 lower case characters'
              }
              className='bg-input-gray text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded'
            />
            <div className='h-4'>{/* PLACEHOLDER_FOR_RENDERING_ERROR */}</div>
          </div>

          <div className='flex flex-col mt-1'>
            <label htmlFor='email' className='mb-2'>
              Email <span className='text-red'>*</span>
            </label>
            <input
              id='email'
              placeholder='Enter your email'
              className='bg-input-gray text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded'
            />
            <div className='h-4'>{/* PLACEHOLDER_FOR_RENDERING_ERROR */}</div>
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
            <div className='h-4'>{/* PLACEHOLDER_FOR_RENDERING_ERROR */}</div>
          </div>

          <div className='flex flex-col mt-1'>
            <label htmlFor='password_confirmation' className='mb-2'>
              Confirm password <span className='text-red'>*</span>
            </label>
            <input
              id='password_confirmation'
              placeholder='Password'
              className='bg-input-gray text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded'
            />
            <div className='h-4'>{/* PLACEHOLDER_FOR_RENDERING_ERROR */}</div>
          </div>
          <button className='mt-7 text-white bg-red py-[0.6rem] lg:py-[0.6rem] w-full lg:text-xl rounded-md'>
            Get started
          </button>
          <button className='text-white mt-3 py-[0.5rem] lg:py-[0.7rem] w-full lg:px-8 rounded-md border lg:text-[1rem] border-white'>
            <Image
              src='/assets/google.png'
              alt='google logo'
              height={16}
              width={16}
              className='inline mr-2'
            />
            Sign up with Google
          </button>
        </form>
        <div className='h-24 flex justify-center items-center'>
          <p className='inline text-xs text-gray-500'>
            Already have an account?
          </p>
          <p className='inline-block ml-2 text-sm text-blue-400 underline'>
            Log in
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
