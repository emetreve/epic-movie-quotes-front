import Image from 'next/image';
import { PropsType } from './types';
import useAddNewQuote from './useAddNewQuote';

const AddNewQuote: React.FC<PropsType> = ({ userName, avatar }) => {
  const { showAddQuote } = useAddNewQuote();

  return (
    <div className='z-50 scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0'>
      <div className='bg-profile-dark-blue h-full w-full lg:h-[29rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative lg:scale-105'>
        <div className='relative pt-7 px-4 flex flex-row justify-center items-center border-b border-gray-700 pb-7'>
          <h1 className='text-xl'>Write new quote</h1>
          <Image
            src='/assets/close-thin.png'
            alt='close modal'
            width={512}
            height={512}
            className='w-[0.9rem] h-[0.9rem] hover:cursor-pointer absolute right-8'
            onClick={() => {
              showAddQuote(false);
            }}
          />
        </div>
        <div className='px-7 mt-7'>
          <div className='flex flex-row items-center lg:mb-4'>
            <Image
              src={avatar ? avatar : '/assets/avatar-default.png'}
              alt='user headshot'
              width={512}
              height={512}
              className='h-10 w-auto mr-3 lg:h-14'
            />
            <p className='lg:text-xl lg:block lg:ml-1'>{userName}</p>
          </div>
          <form className='pt-8'>
            <div className='relative'>
              <textarea
                className='w-full focus:outline-none h-[5.2rem] border border-textarea-gray bg-transparent rounded py-2 px-4 placeholder-textarea-gray italic'
                placeholder='Start creating a new quote'
              />
              <p className='absolute top-3 right-4'>Eng</p>
            </div>
            <div className='relative mt-5'>
              <textarea
                className='w-full focus:outline-none h-[5.2rem] border border-textarea-gray bg-transparent rounded py-2 px-4 placeholder-textarea-gray italic'
                placeholder='ახალი ციტატა'
              />
              <p className='absolute top-3 right-4'>ქარ</p>
            </div>
            <div className='mt-5 w-full h-[4.4rem] items-center flex border border-textarea-gray bg-transparent rounded py-2 px-4'>
              <div className='flex flex-row justify-between w-full'>
                <div className='flex flex-row items-center'>
                  <Image
                    src='/assets/photo-camera.png'
                    alt='photo camera'
                    width={512}
                    height={512}
                    className='h-6 w-6 mr-3 lg:h-14'
                  />
                  <p>Upload image</p>
                </div>
                <button className='bg-upload-btn-violet py-2 px-[0.7rem] bg-opacity-40'>
                  Choose file
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddNewQuote;
