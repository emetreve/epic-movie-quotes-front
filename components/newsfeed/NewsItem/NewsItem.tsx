import Image from 'next/image';
import { PropsType } from './types';

const NewsItem: React.FC<PropsType> = ({
  avatar,
  userName,
  quote,
  movie,
  year,
  quoteImage,
  likesQty,
  commentsQty,
  comments,
}) => {
  return (
    <div className='text-white w-full px-7 bg-news-bg bg-opacity-25 py-6 h-auto mb-10 lg:rounded-xl'>
      <div className='flex flex-row items-center lg:mb-4'>
        <Image
          src={avatar ? avatar : '/assets/avatar-default.png'}
          alt='user headshot'
          width={512}
          height={512}
          className='h-11 w-auto mr-3 lg:h-14'
        />
        <p className='lg:text-xl lg:block lg:ml-1'>{userName}</p>
      </div>

      <div className='text-sm mt-3 lg:text-xl'>
        <p>{`"${quote}" - ${movie}, (${year})`}</p>
        <Image
          src={quoteImage}
          alt='user headshot'
          width={916}
          height={512}
          className='h-48 lg:h-[30rem] mt-3 lg:mt-6 rounded-lg'
        />
      </div>

      <div className='mt-3 lg:mt-5 flex border-b-[0.1rem] border-gray-600 pb-3 lg:pb-5'>
        <div className='flex flex-row items-center'>
          <p className='text-xl'>{commentsQty}</p>
          <Image
            src='/assets/comments-quantity.png'
            alt='comments quantity'
            width={96}
            height={92}
            className='h-5 w-auto ml-2 lg:h-7'
          />
        </div>
        <div className='flex flex-row items-center ml-6'>
          <p className='text-xl'>{likesQty}</p>
          <Image
            src='/assets/likes-quantity.png'
            alt='comments quantity'
            width={96}
            height={92}
            className='h-5 w-auto ml-2 lg:h-7'
          />
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
                  src='/assets/avatar-default.png'
                  alt='user headshot'
                  width={512}
                  height={512}
                  className='h-11 w-auto mr-2 lg:h-14'
                />
                <p className='ml-3 lg:text-xl'>{comment.name}</p>
              </div>
              <p className='text-sm lg:text-lg lg:ml-[4.8rem] lg:mr-1 lg:-mt-4'>
                {comment.body}
              </p>
              <div className='hidden lg:flex ml-[4.8rem] border-gray-600 border-b-[0.1rem] pb-6 '></div>
            </div>
          );
        })}
      <div className='mt-1 flex flex-row py-3 items-center'>
        <Image
          src='/assets/avatar-default.png'
          alt='user headshot'
          width={512}
          height={512}
          className='h-11 w-auto mr-2'
        />
        <input
          placeholder='Write a comment'
          className='bg-comment-input-bg py-[0.43rem] pl-3 rounded-lg w-full lg:ml-5'
        />
      </div>
    </div>
  );
};
export default NewsItem;