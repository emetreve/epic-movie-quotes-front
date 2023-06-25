import Image from 'next/image';
import { PropsType } from './types';
import useViewQuote from './useViewQuote';

const ViewQuote: React.FC<PropsType> = ({
  whichQuoteToView,
  setWhichQuoteToView,
}) => {
  const { handleBringScroll } = useViewQuote(whichQuoteToView);

  return (
    <div className='z-50 lg:pb-16 bg-profile-dark-blue overflow-auto h-screen w-screen fixed backdrop-blur-sm lg:backdrop-blur-none bg-partly-transparent-dark lg:bg-violet-quote-create-bg lg:bg-opacity-70 text-white flex items-center justify-center top-0 left-0'>
      <div className='h-full lg:mt-[4rem] lg:bg-profile-dark-blue w-full lg:h-fit lg:pb-10 lg:w-[54rem] lg:rounded-2xl relative lg:scale-105'>
        <div className='relative pt-6 px-4 flex flex-row items-center border-b border-gray-700 pb-6'>
          <div className='lg:inline-block lg:absolute lg:right-0 lg:ml-6 lg:mt-0 mt-3 py-[0.5rem] lg:w-[6.5rem] w-[6.3rem] px-3 rounded'>
            <div className='flex flex-row gap-x-5 items-center justify-end'>
              <div className='flex'>
                <Image
                  onClick={() => {
                    // showMovieEdit(true);
                  }}
                  src='/assets/edit.png'
                  alt='edit quote'
                  width={80}
                  height={80}
                  className='h-[1.1rem] w-auto lg:ml-0 ml-1 hover:cursor-pointer'
                />
              </div>
              <div className='border-r border-gray-600 h-3 mr-[0.1rem]'></div>
              <div className='flex'>
                <Image
                  onClick={() => {
                    // handleDelete(movie.id);
                  }}
                  src='/assets/delete.png'
                  alt='delete quote'
                  width={70}
                  height={80}
                  className='h-[1.13rem] w-auto mr-2 hover:cursor-pointer'
                />
              </div>
            </div>
          </div>
          <Image
            src='/assets/close-thin.png'
            alt='close modal'
            width={512}
            height={512}
            className='w-[0.9rem] h-[0.9rem] hover:cursor-pointer absolute right-8'
            onClick={() => {
              setWhichQuoteToView(null);
              handleBringScroll();
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default ViewQuote;
