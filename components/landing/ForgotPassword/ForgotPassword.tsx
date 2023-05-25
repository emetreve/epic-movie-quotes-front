import { FormProvider } from 'react-hook-form';
import Image from 'next/image';
import { useForgotPassword } from '@/hooks';
import { Error, ValidationIcons } from '@/components';

const ForgotPassword = () => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    applyInputStyle,
    formState,
    methods,
  } = useForgotPassword();
  return (
    <div className='scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0 z-50'>
      <div className='bg-gradient-violet lg:bg-gradient-plain-violet h-full w-full lg:h-[40rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative lg:scale-105'>
        <div className='flex flex-col items-center justify-center h-32 mt-24 text-center'>
          <h1 className='text-3xl pt-2 lg:text-[2.1rem] lg:mb-1'>
            Forgot Password?
          </h1>
          <p className='text-gray-500 text-sm mt-3 block w-[20rem]'>
            Enter the email and we’ll send an email with instructions to reset
            your password
          </p>
        </div>

        <FormProvider {...methods}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='w-full px-8 text-sm mt-5'
          >
            <div className='flex flex-col mt-1'>
              <label htmlFor='user' className='mb-2'>
                Email <span className='text-red'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('email', {
                    required: 'This field is required.',
                    minLength: {
                      value: 3,
                      message: 'This field must have at least 3 characters.',
                    },
                  })}
                  id='user'
                  placeholder='Enter your email'
                  className={`${
                    applyInputStyle()
                      ? 'border-red'
                      : formState.dirtyFields['email']
                      ? 'border-green'
                      : ''
                  } bg-input-gray border-2 text-txt-black py-[0.5rem] px-3 w-full placeholder-gray-500 rounded`}
                />
                <ValidationIcons name='email' />
              </div>
              <div className='h-4'>
                {errors?.email && <Error content={errors.email.message} />}
              </div>
            </div>

            <button
              type='submit'
              className='mt-5 text-white bg-red py-[0.6rem] lg:py-[0.6rem] w-full lg:text-xl rounded-md'
            >
              Send instructions
            </button>
          </form>
        </FormProvider>

        <div className='w-full flex flex-row items-center justify-center mt-8'>
          <Image
            //   onClick={() => show(false)}
            src='/assets/back.png'
            alt='back button'
            width={200}
            height={200}
            className='h-auto w-3 lg:h-5 lg:w-5 hover:cursor-pointer'
          />
          <p className='text-xs ml-2 text-gray-500'>Back to login</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
