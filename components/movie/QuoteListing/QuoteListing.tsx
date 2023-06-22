import { PropsType } from './types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Heart } from '@/components';
import { Like } from '@/types';

const QuoteListing: React.FC<PropsType> = ({
  likesCount,
  commentsCount,
  body,
  image,
  likes,
  authUserId,
}) => {
  const { locale } = useRouter();

  return (
    <div className='text-white shadow-lg w-full lg:w-[43rem] lg:rounded-xl pt-5 pb-0 bg-profile-dark-blue bg-opacity-95'>
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
        <div className='border-t border-gray-600 border-opacity-70'>
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
        </div>
      </div>
    </div>
  );
};
export default QuoteListing;
