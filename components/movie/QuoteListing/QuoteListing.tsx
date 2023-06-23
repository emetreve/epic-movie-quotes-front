import { PropsType } from './types';
import Image from 'next/image';
import { Heart, ViewOptions } from '@/components';
import { Like } from '@/types';
import useQuoteListing from './useQuoteListing';

const QuoteListing: React.FC<PropsType> = ({
  likesCount,
  commentsCount,
  body,
  image,
  likes,
  authUserId,
  quoteId,
}) => {
  const { locale, handleViewOptions, showOptions, handleDelete } =
    useQuoteListing(quoteId);

  return (
    <div className='text-white relative shadow-lg w-full lg:w-[43rem] lg:rounded-xl pt-5 pb-0 bg-profile-dark-blue bg-opacity-95'>
      <div className='justify-end hidden lg:flex'>
        <div
          onClick={handleViewOptions}
          className='relative right-7 top-3 mr-1 hover:cursor-pointer'
        >
          <ViewOptions classes='h-[0.36rem]' />
        </div>
      </div>
      {showOptions && (
        <div className='absolute flex items-center pl-8 bottom-10 right-7 bg-violet-quote shadow-lg rounded-lg h-[9rem] w-[12rem]'>
          <div className='font-light text-sm flex flex-col gap-5'>
            <div className='flex flex-row items-center'>
              <Image
                src='/assets/view.png'
                alt='view quote'
                width={80}
                height={56}
                className='h-[0.9rem] w-auto mr-[0.8rem]'
              />
              <p className='hover:cursor-pointer'>Vew quote</p>
            </div>
            <div className='flex flex-row items-center'>
              <Image
                src='/assets/edit.png'
                alt='edit quote'
                width={80}
                height={80}
                className='h-[1rem] w-auto mr-[1.1rem]'
              />
              <p className='hover:cursor-pointer'>Edit</p>
            </div>
            <div className='flex flex-row items-center'>
              <Image
                src='/assets/delete.png'
                alt='delete quote'
                width={70}
                height={80}
                className='h-[0.97rem] w-auto mr-[1.15rem]'
              />
              <p onClick={handleDelete} className='hover:cursor-pointer'>
                Delete
              </p>
            </div>
          </div>
        </div>
      )}
      <div className='lg:flex flex-row items-center lg:mb-5'>
        <Image
          src={
            image
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${image}`
              : '/assets/quote-sample.png'
          }
          alt='create new'
          width={96}
          height={96}
          className='w-full h-[8.5rem] lg:w-[16rem] lg:h-[8.5rem] px-7 hover:cursor-pointer mr-2'
        />
        <div className='px-7 lg:-ml-[2.5rem] break-all'>
          <p className='italic my-6 text-input-gray text-lg leading-7'>{`"${
            body[locale as keyof typeof body]
          }"`}</p>
        </div>
      </div>
      <div className='px-7'>
        <div className='border-t border-gray-600 border-opacity-70 flex items-center justify-between'>
          <div className='mt-3 lg:mt-5 flex pb-3 lg:pb-5'>
            <div className='flex flex-row items-center'>
              <p className='text-lg'>{commentsCount}</p>
              <Image
                src='/assets/comments-quantity.png'
                alt='comments quantity'
                width={96}
                height={92}
                className='h-5 w-auto ml-2 lg:h-7'
              />
            </div>
            <div className='flex flex-row items-center ml-6'>
              <p className='text-lg block w-2'>{likesCount}</p>
              <div className='hover:cursor-pointer z-[30]'>
                <Heart
                  classes={`h-5 w-auto ml-2 lg:h-7 ${
                    likes?.some((like: Like) => like.user_id === authUserId)
                      ? 'fill-like'
                      : 'fill-white'
                  }`}
                />
              </div>
            </div>
          </div>
          <div
            onClick={handleViewOptions}
            className='mr-1 hover:cursor-pointer lg:hidden'
          >
            <ViewOptions classes='h-[0.36rem]' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuoteListing;
