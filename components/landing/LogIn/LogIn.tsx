import { FormProvider } from 'react-hook-form';
import { PropsType } from './types';
import Image from 'next/image';
import { useLogIn } from '@/hooks';
import { Error, ValidationIcons } from '@/components';

const LogIn: React.FC<PropsType> = ({ show, swap }) => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    hidePassword,
    setHidePassword,
    applyInputStyle,
    formState,
    methods,
    handleForgot,
  } = useLogIn();

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

        <FormProvider {...methods}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='w-full px-8 text-sm'
          >
            <div className='flex flex-col mt-1'>
              <label htmlFor='user' className='mb-2'>
                User <span className='text-red'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('user', {
                    required: 'This field is required.',
                    minLength: {
                      value: 3,
                      message: 'This field must have at least 3 characters.',
                    },
                  })}
                  id='user'
                  placeholder='Enter your username or email'
                  className={`${
                    applyInputStyle('user')
                      ? 'border-red'
                      : formState.dirtyFields['user']
                      ? 'border-green'
                      : ''
                  } bg-input-gray border-2 text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded`}
                />
                <ValidationIcons name='user' />
              </div>
              <div className='h-4'>
                {errors?.user && <Error content={errors.user.message} />}
              </div>
            </div>

            <div className='flex flex-col mt-1'>
              <label htmlFor='password' className='mb-2'>
                Password <span className='text-red'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('password', {
                    required: 'This field is required.',
                  })}
                  id='password'
                  placeholder='Password'
                  type={hidePassword ? 'password' : 'text'}
                  className={`${
                    applyInputStyle('password')
                      ? 'border-red'
                      : formState.dirtyFields['password']
                      ? 'border-green'
                      : ''
                  } bg-input-gray border-2 text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded`}
                />
                <ValidationIcons name='password' password_related={true} />
                <Image
                  onClick={() => {
                    setHidePassword((prev) => !prev);
                  }}
                  src='/assets/eye-password.png'
                  alt='show password'
                  width={200}
                  height={200}
                  className='absolute right-4 bottom-[0.7rem] w-4 h-4 hover:cursor-pointer'
                />
              </div>
              <div className='h-4'>
                {errors?.password && (
                  <Error content={errors.password.message} />
                )}
              </div>
            </div>

            <div className='flex mt-1'>
              <div className='flex justify-center items-center'>
                <input
                  {...register('remember', {
                    required: false,
                  })}
                  className='w-4 h-4 inline rounded border-none'
                  type='checkbox'
                  name='remember'
                  id='remember'
                />
                <label className='ml-2 pt-[0.1rem] relative' htmlFor='remember'>
                  Remember me
                </label>
              </div>
              <div className='ml-auto underline text-blue-600 hover:cursor-pointer'>
                <p onClick={handleForgot}>Forgot password</p>
              </div>
            </div>

            <button
              type='submit'
              className='mt-5 text-white bg-red py-[0.6rem] lg:py-[0.6rem] w-full lg:text-xl rounded-md'
            >
              Sign in
            </button>
          </form>
        </FormProvider>
        <div className='w-full px-8 text-sm'>
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
        </div>
        <div className='h-24 flex justify-center items-center'>
          <p className='inline text-xs text-gray-500'>
            Don&apos;t have an account?
          </p>
          <p
            onClick={() => {
              show(false);
              swap(true);
            }}
            className='inline-block ml-2 text-sm text-blue-400 underline'
          >
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
