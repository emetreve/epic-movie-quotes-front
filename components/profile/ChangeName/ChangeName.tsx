import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components';
import useChangeName from './useChangeName';

const ChangeName = () => {
  const { showUpdateName } = useChangeName();

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
      <div className='bg-violet bg-opacity-80 py-16 px-8 rounded-lg'>
        <div className='flex flex-col mt-1 w-[100%]'>
          <label htmlFor='username' className='mb-1 text-xs text-white'>
            Enter your username
          </label>
          <input
            id='username'
            className='bg-input-gray mt-1 w-full py-2 rounded-md px-4 border-input-gray placeholder-txt-black'
          />
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
        <button className='mr-10 font-light text-white bg-red py-[0.4rem] px-4 rounded-md hover:bg-red-hover'>
          Edit
        </button>
      </div>
    </div>
  );
};

export default ChangeName;
