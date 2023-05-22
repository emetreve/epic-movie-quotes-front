import { FormProvider } from 'react-hook-form';
import { PropsType } from './types';
import Image from 'next/image';
import { useCreateAccount } from '@/hooks';
import { Error, ValidationIcons } from '@/components';

const CreateAccount: React.FC<PropsType> = ({ show, swap }) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    password,
    hidePassword,
    setHidePassword,
    hidePasswordConfirm,
    setHidePasswordConfirm,
    applyInputStyle,
    formState,
    methods,
  } = useCreateAccount();

  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div className='bg-gradient-violet lg:bg-gradient-plain-violet h-full w-full lg:h-[45rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative'>
        <Image
          onClick={() => show(false)}
          src='/assets/close-btn.png'
          alt='close button'
          width={200}
          height={200}
          className='h-5 w-5 lg:h-7 lg:w-7 right-0 absolute mt-7 mr-8 opacity-50 hover:cursor-pointer'
        />

        <div className='flex flex-col items-center justify-center h-32 mt-8'>
          <h1 className='text-2xl pt-2 lg:text-[2.1rem] lg:mb-1'>
            Create an account
          </h1>
          <p className='text-gray-500 text-sm mt-3'>Start your journey!</p>
        </div>

        <FormProvider {...methods}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='w-full px-8 text-sm'
          >
            <div className='flex flex-col'>
              <label htmlFor='name' className='mb-2'>
                Name <span className='text-red'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('name', {
                    required: 'This field is required.',
                    minLength: {
                      value: 3,
                      message: 'This field must have at least 3 characters.',
                    },
                    maxLength: {
                      value: 15,
                      message: "This field can't have more than 15 characters.",
                    },
                    pattern: {
                      value: /^[a-z0-9]+$/,
                      message:
                        'Only lowercase letters and numbers are allowed.',
                    },
                    onChange: (e) => {
                      localStorage.setItem('name', e.target.value);
                    },
                  })}
                  id='name'
                  placeholder='Enter your name'
                  className={`${
                    applyInputStyle('name')
                      ? 'border-red'
                      : formState.dirtyFields['name']
                      ? 'border-green'
                      : ''
                  } bg-input-gray border-2 text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded`}
                />
                <ValidationIcons name='name' />
              </div>
              <div className='h-4'>
                {errors?.name && <Error content={errors.name.message} />}
              </div>
            </div>

            <div className='flex flex-col mt-1'>
              <label htmlFor='email' className='mb-2'>
                Email <span className='text-red'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('email', {
                    required: 'This field is required.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address.',
                    },
                    onChange: (e) => {
                      localStorage.setItem('email', e.target.value);
                    },
                  })}
                  id='email'
                  placeholder='Enter your email'
                  className={`${
                    applyInputStyle('email')
                      ? 'border-red'
                      : formState.dirtyFields['email']
                      ? 'border-green'
                      : ''
                  } bg-input-gray border text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded`}
                />
                <ValidationIcons name='email' />
              </div>
              <div className='h-4'>
                {errors?.email && <Error content={errors.email.message} />}
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
                    minLength: {
                      value: 8,
                      message: 'This field must have at least 8 characters.',
                    },
                    maxLength: {
                      value: 15,
                      message: "This field can't have more than 15 characters.",
                    },
                    pattern: {
                      value: /^[a-z0-9]+$/,
                      message:
                        'Only lowercase letters and numbers are allowed.',
                    },
                  })}
                  type={hidePassword ? 'password' : 'text'}
                  id='password'
                  placeholder='Password'
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

            <div className='flex flex-col mt-1'>
              <label htmlFor='password_confirmation' className='mb-2'>
                Confirm password <span className='text-red'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('password_confirmation', {
                    required: 'This field is required.',
                    validate: (value) =>
                      value === password || 'Passwords do not match.',
                  })}
                  type={hidePasswordConfirm ? 'password' : 'text'}
                  id='password_confirmation'
                  placeholder='Password'
                  className={`${
                    applyInputStyle('password_confirmation')
                      ? 'border-red'
                      : formState.dirtyFields['password_confirmation']
                      ? 'border-green'
                      : ''
                  } bg-input-gray border-2 text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded`}
                />
                <ValidationIcons
                  name='password_confirmation'
                  password_related={true}
                />
                <Image
                  onClick={() => {
                    setHidePasswordConfirm((prev) => !prev);
                  }}
                  src='/assets/eye-password.png'
                  alt='show password'
                  width={200}
                  height={200}
                  className='absolute right-4 bottom-[0.7rem] w-4 h-4 hover:cursor-pointer'
                />
              </div>
              <div className='h-4'>
                {errors?.password_confirmation && (
                  <Error content={errors.password_confirmation.message} />
                )}
              </div>
            </div>
            <button
              type='submit'
              className='mt-7 text-white bg-red py-[0.6rem] lg:py-[0.6rem] w-full lg:text-xl rounded-md'
            >
              Get started
            </button>
          </form>
        </FormProvider>
        <div className='w-full px-8 text-sm'>
          <button className='w-full text-white mt-3 py-[0.5rem] lg:py-[0.7rem] lg:px-8 rounded-md border lg:text-[1rem] border-white'>
            <Image
              src='/assets/google.png'
              alt='google logo'
              height={16}
              width={16}
              className='inline mr-2'
            />
            Sign up with Google
          </button>
        </div>
        <div className='h-24 flex justify-center items-center'>
          <p className='inline text-xs text-gray-500'>
            Already have an account?
          </p>
          <p
            onClick={() => {
              show(false);
              swap(true);
            }}
            className='inline-block ml-2 text-sm text-blue-400 underline'
          >
            Log in
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
