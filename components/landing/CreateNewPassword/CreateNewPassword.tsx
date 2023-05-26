import { FormProvider } from 'react-hook-form';
import Image from 'next/image';
import { Error, ValidationIcons } from '@/components';
import { useCreateNewPassword } from '@/hooks';

const CreateNewPassword = () => {
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
    handleClose,
    handleGoToLogIn,
  } = useCreateNewPassword();

  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div className='bg-gradient-violet lg:bg-gradient-plain-violet h-full w-full lg:h-[34.5rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative lg:scale-105'>
        <Image
          onClick={handleClose}
          src='/assets/close-btn.png'
          alt='close button'
          width={200}
          height={200}
          className='h-5 w-5 lg:h-7 lg:w-7 right-0 absolute mt-7 mr-8 opacity-50 hover:cursor-pointer'
        />
        <div className='flex flex-col items-center justify-center h-32 mt-24 lg:mt-[4.5rem] text-center'>
          <h1 className='text-3xl pt-2 lg:text-[2.1rem] lg:mb-1'>
            Create New Password
          </h1>
          <p className='text-gray-500 text-sm mt-3 block w-[20rem]'>
            Your new password must be different from previous used passwords
          </p>
        </div>

        <FormProvider {...methods}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='w-full px-8 text-sm mt-5'
          >
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
              className='mt-5 text-white bg-red py-[0.6rem] lg:py-[0.6rem] w-full lg:text-xl rounded-md'
            >
              Reset password
            </button>
          </form>
        </FormProvider>

        <div
          onClick={handleGoToLogIn}
          className='w-full flex flex-row items-center justify-center mt-8 hover:cursor-pointer'
        >
          <Image
            src='/assets/back.png'
            alt='back button'
            width={200}
            height={200}
            className='h-auto w-3 lg:h-[0.76rem] lg:w-auto hover:cursor-pointer'
          />
          <p className='text-xs ml-2 text-gray-500'>Back to login</p>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
