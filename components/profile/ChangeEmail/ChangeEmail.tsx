import Image from 'next/image';
import { Header, ValidationIcons } from '@/components';
import Link from 'next/link';
import useChangeEmail from './useChangeEmail';
import { PropsType } from './types';
import { FormProvider } from 'react-hook-form';

const ChangeEmail: React.FC<PropsType> = ({
  userName,
  authUserId,
  setEmailSuccess,
}) => {
  const {
    handleOutsideClick,
    showUpdateEmail,
    t,
    register,
    handleSubmit,
    errors,
    onSubmit,
    methods,
    applyInputStyle,
    formState,
  } = useChangeEmail(setEmailSuccess);

  return (
    <div
      onClick={handleOutsideClick}
      className='bg-gradient-violet min-h-screen relative pb-5 lg:pb-14'
    >
      <div className='h-[5rem]'>
        <Header hideSearch={true} userName={userName} authUserId={authUserId} />
      </div>
      <div>
        <Link href='/dashboard/profile'>
          <Image
            src='/assets/back-hd.png'
            alt='go back'
            width={520}
            height={512}
            className='w-[0.9rem] h-auto ml-[2rem] my-5'
            onClick={() => {
              showUpdateEmail(false);
            }}
          />
        </Link>
      </div>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className='bg-violet bg-opacity-80 py-16 px-8 rounded-lg'>
            <div className='flex flex-col mt-1 w-[100%]'>
              <label htmlFor='username' className='mb-1 text-xs text-white'>
                {t('Enter your email')}
              </label>
              <div className='relative'>
                <input
                  id='email'
                  {...register('email', {
                    required: `${t('This field is required')}`,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: `${t('Invalid email address')}`,
                    },
                  })}
                  className={`${
                    applyInputStyle()
                      ? 'border-red'
                      : formState.dirtyFields['email']
                      ? 'border-green'
                      : ''
                  } bg-input-gray mt-1 w-full py-2 border-2 rounded-md px-4 placeholder-txt-black`}
                />
                <div className='-mt-[0.15rem]'>
                  <ValidationIcons name='email' />
                </div>
              </div>
              <div className='h-2 pt-[0.4rem]'>
                <p className='text-red text-xs'>{errors['email']?.message}</p>
              </div>
            </div>
          </div>

          <div className='flex justify-between mt-9'>
            <p
              onClick={() => {
                showUpdateEmail(false);
              }}
              className='ml-10 py-[0.4rem] text-input-gray hover:cursor-pointer'
            >
              {t('Cancel')}
            </p>
            <button
              type='submit'
              className='mr-10 font-light text-white bg-red py-[0.4rem] px-4 rounded-md hover:bg-red-hover'
            >
              {t('Edit')}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default ChangeEmail;
