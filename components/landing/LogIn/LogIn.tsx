import { FormProvider } from 'react-hook-form';
import { PropsType } from './types';
import Image from 'next/image';
import useLogIn from './useLogIn';
import { Error, ValidationIcons } from '@/components';
import { useTranslation } from 'next-i18next';

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
    handleGoogle,
  } = useLogIn();

  const { t } = useTranslation('landing');

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
            {t('Log in to your account')}
          </h1>
          <div className='px-5'>
            <p className='text-gray-500 text-sm mt-3 text-center'>
              {t('Welcome back! Please enter your details')}
            </p>
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='w-full px-8 text-sm'
          >
            <div className='flex flex-col mt-1'>
              <label htmlFor='user' className='mb-2'>
                {t('User')} <span className='text-red'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('user', {
                    required: `${t('This field is required')}`,
                    minLength: {
                      value: 3,
                      message: `${t(
                        'This field must have at least 3 characters'
                      )}`,
                    },
                  })}
                  id='user'
                  placeholder={`${t('Enter your username or email')}`}
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
                {t('Password')} <span className='text-red'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('password', {
                    required: `${t('This field is required')}`,
                  })}
                  id='password'
                  placeholder={`${t('Password')}`}
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
                  {t('Remember me')}
                </label>
              </div>
              <div className='ml-auto underline text-blue-600 hover:cursor-pointer'>
                <p onClick={handleForgot}>{t('Forgot password')}</p>
              </div>
            </div>

            <button
              type='submit'
              className='mt-5 text-white bg-red py-[0.6rem] lg:py-[0.6rem] w-full lg:text-xl rounded-md'
            >
              {t('Sign in')}
            </button>
          </form>
        </FormProvider>
        <div className='w-full px-8 text-sm'>
          <button
            onClick={handleGoogle}
            className='text-white mt-3 py-[0.5rem] lg:py-[0.7rem] w-full lg:px-8 rounded-md border lg:text-[1rem] border-white'
          >
            <Image
              src='/assets/google.png'
              alt='google logo'
              height={16}
              width={16}
              className='inline mr-2'
            />
            {t('Sign in with Google')}
          </button>
        </div>
        <div className='h-24 flex justify-center items-center'>
          <p className='inline text-xs text-gray-500'>
            {t("Don't have an account")}
          </p>
          <p
            onClick={() => {
              show(false);
              swap(true);
            }}
            className='inline-block ml-2 text-sm text-blue-400 underline hover:cursor-pointer'
          >
            {t('Sign Up')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
