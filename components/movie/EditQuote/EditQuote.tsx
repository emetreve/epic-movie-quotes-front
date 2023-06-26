import Image from 'next/image';
import { PropsType } from './types';
import useEditQuote from './useEditQuote';

const EditQuote: React.FC<PropsType> = ({ authUserAvatar, authUserName }) => {
  return (
    <div className='z-50 lg:pb-16 bg-profile-dark-blue overflow-auto h-screen w-screen fixed backdrop-blur-sm lg:backdrop-blur-none bg-partly-transparent-dark lg:bg-violet-quote-create-bg lg:bg-opacity-70 text-white flex items-center justify-center top-0 left-0'>
      <div className='h-full fixed lg:top-[5rem] lg:bg-profile-dark-blue w-full lg:h-fit lg:pb-10 lg:w-[50rem] lg:rounded-2xl lg:scale-105'>
        <div className='pt-6 px-4 flex flex-row items-center justify-center border-b border-gray-700 pb-6'>
          <Image
            onClick={() => {
              // handleDelete(quote.id);
            }}
            src='/assets/delete.png'
            alt='delete quote'
            width={70}
            height={80}
            className='h-[1.06rem] absolute left-4 w-auto hover:cursor-pointer'
          />
          <div>
            <p className='block'>Edit quote</p>
          </div>
          <Image
            src='/assets/close-thin.png'
            alt='close modal'
            width={512}
            height={512}
            className='w-[0.9rem] h-[0.9rem] hover:cursor-pointer absolute right-8'
            // onClick={handleClose}
          />
        </div>
        <div className='flex flex-row items-center lg:mb-4 mt-6 px-6 mb-3'>
          <Image
            src={
              authUserAvatar
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${authUserAvatar}`
                : '/assets/avatar-default.png'
            }
            alt='user headshot'
            width={512}
            height={512}
            className='h-11 w-auto mr-3 lg:h-14 rounded-[50%]'
          />
          <p className='lg:text-xl lg:block lg:ml-1'>{authUserName}</p>
        </div>
        <div className='relative'>
          <div className='relative w-full'>
            <div className='mr-10 pl-1'>
              <div className='relative h-fit flex flex-col items-center w-full focus:outline-none'>
                <div className='w-full min-h-[2rem] break-all relative h-fit mt-3 ml-8 pr-[4rem] rounded-[0.3rem] bg-transparent py-1 pl-4 text-input-gray italic border border-textarea-gray'>
                  {/* {quote && quote.body.en} */} quote body english
                </div>
              </div>
              <p className='absolute top-8 lg:top-4 right-9 text-textarea-gray'>
                Eng
              </p>
            </div>
          </div>
          <div className='relative w-full'>
            <div className='mr-10 pl-1'>
              <div className='relative h-fit flex flex-col items-center w-full focus:outline-none'>
                <div className='w-full min-h-[2rem] break-all relative h-fit mt-3 ml-8 pr-[4rem] rounded-[0.3rem] bg-transparent py-1 pl-4 text-input-gray italic border border-textarea-gray'>
                  {/* {quote && quote.body.ka} */} quote body georgian
                </div>
              </div>
              <p className='absolute top-8 lg:top-4 right-9 text-textarea-gray'>
                ქარ
              </p>
            </div>
          </div>

          <div className='text-sm mt-3 lg:text-xl break-all px-6'>
            <Image
              src='/assets/quote-sample.png'
              alt='quote image'
              width={916}
              height={512}
              className='h-[16rem] lg:h-[25rem] mt-3 lg:mt-6 rounded-lg'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditQuote;
