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
        <div className='relative pt-7 px-4 flex flex-row justify-center items-center border-b border-gray-700 pb-7'>
          <h1 className='text-xl'>Write new quote</h1>
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
