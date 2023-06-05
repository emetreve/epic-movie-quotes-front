import Image from 'next/image';
import Link from 'next/link';
import { FormProvider } from 'react-hook-form';
import { Header } from '@/components';
import useChangeName from './useChangeName';

const ChangeName = () => {
  const {
    showUpdateName,
    applyInputStyle,
    register,
    formState,
    errors,
    methods,
    handleSubmit,
    onSubmit,
    showNameForm,
    showConfirmModal,
    setShowConfirmModal,
    setShowNameForm,
    handleConfirm,
  } = useChangeName();

  return (
    <div className='bg-gradient-violet min-h-screen relative pb-5 lg:pb-14'>
      <Header hideSearch={true} />
      <div>
        <Link href='/dashboard/profile'>
          <Image
            src='/assets/back-hd.png'
            alt='go back'
            width={520}
            height={512}
            className='w-[0.9rem] h-auto ml-[2rem] my-5'
            onClick={() => {
              showUpdateName(false);
            }}
          />
        </Link>
      </div>
      {showNameForm && (
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className='bg-violet bg-opacity-80 py-16 px-8 rounded-lg'>
              <div className='flex flex-col mt-1 w-[100%]'>
                <label htmlFor='username' className='mb-1 text-xs text-white'>
                  Enter your username
                </label>
                <input
                  id='username'
                  {...register('username', {
                    required: 'This field is required.',
                    minLength: {
                      value: 3,
                      message: 'This field must have at least 3 characters.',
                    },
                  })}
                  className={`${
                    applyInputStyle()
                      ? 'border-red'
                      : formState.dirtyFields['username']
                      ? 'border-green'
                      : ''
                  } bg-input-gray mt-1 w-full py-2 border-2 rounded-md px-4 placeholder-txt-black`}
                />
                <div className='h-2 pt-[0.15rem]'>
                  <p className='text-red text-xs'>
                    {errors['username']?.message}
                  </p>
                </div>
              </div>
            </div>

            <div className='flex justify-between mt-9'>
              <p
                onClick={() => {
                  showUpdateName(false);
                }}
                className='ml-10 py-[0.4rem] text-input-gray hover:cursor-pointer'
              >
                Cancel
              </p>
              <button
                type='submit'
                className='mr-10 font-light text-white bg-red py-[0.4rem] px-4 rounded-md hover:bg-red-hover'
              >
                Edit
              </button>
            </div>
          </form>
        </FormProvider>
      )}
      {showConfirmModal && (
        <div className='rounded-lg flex flex-col items-center justify-center h-[11rem] mt-20 bg-gradient-gray mx-8'>
          <p className='text-white pb-8 text-sm pt-10'>
            Are you sure to make changes ?
          </p>
          <div className='border-b border-b-gray-600 w-full'></div>
          <div className='flex justify-between w-full'>
            <p
              onClick={() => {
                setShowConfirmModal(false);
                setShowNameForm(true);
              }}
              className='text-input-gray hover:cursor-pointer mt-5 ml-5 py-[0.4rem]'
            >
              Cancel
            </p>
            <button
              onClick={handleConfirm}
              className='font-light text-xs text-white mt-5 mr-5 bg-red py-[0.4rem] px-2 rounded-md hover:bg-red-hover'
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeName;
