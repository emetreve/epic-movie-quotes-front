import Image from 'next/image';
import { PropsType } from './types';
import useNewsItem from './useNewsItem';
import { Heart } from '@/components';
import { Like } from '@/types';

const NewsItem: React.FC<PropsType> = ({
  quoteId,
  userId,
  userName,
  quote,
  movie,
  year,
  quoteImage,
  likesQuantity,
  commentsQuantity,
  comments,
  likes,
  authUserId,
  authUserAvatar,
  userAvatar,
}) => {
  const { handleSubmit, onSubmit, register, handleLike, t } = useNewsItem();

  return (
    <div className='text-white w-full px-7 bg-news-bg bg-opacity-25 py-6 h-auto mb-10 lg:rounded-xl'>
      <div className='flex flex-row items-center lg:mb-4'>
        <Image
          src={
            userAvatar
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${userAvatar}`
              : '/assets/avatar-default.png'
          }
          alt='user headshot'
          width={512}
          height={512}
          className='h-11 w-11 lg:w-[3.6rem] mr-3 lg:h-[3.6rem] rounded-[50%]'
        />
        <p className='lg:text-xl lg:block lg:ml-1'>{userName}</p>
      </div>

      <div className='text-sm mt-3 lg:text-xl break-all'>
        <p>{`"${quote}" - ${movie}, (${year})`}</p>
        <Image
          src={quoteImage}
          alt='quote image'
          width={916}
          height={512}
          className='h-48 lg:h-[30rem] mt-3 lg:mt-6 rounded-lg'
        />
      </div>

      <div className='mt-3 lg:mt-5 flex border-b-[0.1rem] border-gray-600 pb-3 lg:pb-5'>
        <div className='flex flex-row items-center'>
          <p className='text-lg'>{commentsQuantity}</p>
          <Image
            src='/assets/comments-quantity.png'
            alt='comments quantity'
            width={96}
            height={92}
            className='h-5 w-auto ml-2 lg:h-7'
          />
        </div>
        <div className='flex flex-row items-center ml-6'>
          <p className='text-lg block w-2'>{likesQuantity}</p>
          <div
            onClick={() => handleLike(authUserId, quoteId)}
            className='hover:cursor-pointer z-[30]'
          >
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

      {comments &&
        comments.map((comment) => {
          return (
            <div
              key={comment.id}
              className='mt-2 border-b-[0.1rem] border-gray-600 pb-6 lg:pb-2 lg:border-none'
            >
              <div className='flex flex-row py-3 items-center'>
                <Image
                  src={
                    comment.user.avatar
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${comment.user.avatar}`
                      : '/assets/avatar-default.png'
                  }
                  alt='user headshot'
                  width={512}
                  height={512}
                  className='h-12 w-12 mr-2 lg:h-[3.8rem] lg:w-[3.8rem] rounded-[50%]'
                />
                <p className='ml-3 lg:text-xl'>{comment.user.name}</p>
              </div>
              <p className='text-sm lg:text-lg lg:ml-[4.8rem] lg:mr-1 lg:-mt-4 break-all'>
                {comment.body}
              </p>
              <div className='hidden lg:flex ml-[4.8rem] border-gray-600 border-b-[0.1rem] pb-6 '></div>
            </div>
          );
        })}
      <div className='mt-1 flex flex-row py-3 items-center'>
        <Image
          src={
            authUserAvatar
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${authUserAvatar}`
              : '/assets/avatar-default.png'
          }
          alt='user headshot'
          width={512}
          height={512}
          className='lg:h-14 lg:w-14 h-12 w-12 mr-2 rounded-[50%]'
        />
        <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:pr-5'>
          <input
            {...register('body', { required: true })}
            placeholder={`${t('Write a comment')}`}
            className='bg-comment-input-bg py-[0.43rem] pl-3 rounded-lg w-full lg:ml-5'
          />
          <input
            {...register('user_id', { required: true })}
            type='hidden'
            name='user_id'
            defaultValue={userId}
          />
          <input
            {...register('quote_id', { required: true })}
            type='hidden'
            name='quote_id'
            defaultValue={quoteId}
          />
          <button className='hidden'></button>
        </form>
      </div>
    </div>
  );
};
export default NewsItem;
