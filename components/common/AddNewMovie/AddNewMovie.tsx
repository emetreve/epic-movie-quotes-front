import Image from 'next/image';
import { PropsType } from './types';

const AddNewMovie: React.FC<PropsType> = ({ avatar, userName }) => {
  return (
    <div
      //   onDrop={handleDrop}
      //   onDragOver={handleDragOver}
      //   onClick={() => {
      //     setShowMovieDropdown(false);
      //   }}
      className='z-50 lg:pb-16 scrollbar-hide h-screen w-screen fixed backdrop-blur-sm lg:backdrop-blur-none bg-partly-transparent-dark lg:bg-violet-quote-create-bg lg:bg-opacity-70 text-white flex items-center justify-center top-0 left-0'
    >
      <div className='bg-profile-dark-blue h-full w-full lg:h-[47.5rem] lg:w-[54rem] lg:rounded-2xl relative lg:scale-105'>
        <div className='relative pt-7 px-4 flex flex-row justify-center items-center border-b border-gray-700 pb-7'>
          <h1 className='text-xl'>Add movie</h1>
          <Image
            src='/assets/close-thin.png'
            alt='close modal'
            width={512}
            height={512}
            className='w-[0.9rem] h-[0.9rem] hover:cursor-pointer absolute right-8'
            onClick={() => {
              //   showAddQuote(false);
            }}
          />
        </div>
        <div className='px-7 mt-7 lg:px-[2rem]'>
          <div className='flex flex-row items-center lg:mb-4'>
            <Image
              src={
                avatar
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${avatar}`
                  : '/assets/avatar-default.png'
              }
              alt='user headshot'
              width={512}
              height={512}
              className='h-11 w-auto mr-3 lg:h-14 rounded-[50%]'
            />
            <p className='lg:text-xl lg:block lg:ml-1'>{userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewMovie;
