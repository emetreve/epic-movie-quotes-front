import Image from 'next/image';
import { PropsType } from './types';
import useViewQuote from './useViewQuote';
import { Heart } from '@/components';
import { Comment, Like } from '@/types';

const ViewQuote: React.FC<PropsType> = ({
  whichQuoteToView,
  setWhichQuoteToView,
  authUserAvatar,
  authUserName,
  authUserId,
}) => {
  const {
    handleBringScroll,
    register,
    handleSubmit,
    quote,
    onSubmit,
    handleLike,
  } = useViewQuote(whichQuoteToView);

  return (
    <div className='z-50 lg:pb-16 bg-profile-dark-blue overflow-auto h-screen w-screen fixed backdrop-blur-sm lg:backdrop-blur-none bg-partly-transparent-dark lg:bg-violet-quote-create-bg lg:bg-opacity-70 text-white flex items-center justify-center top-0 left-0'>
      <div className='h-full lg:mt-[15rem] lg:bg-profile-dark-blue w-full lg:h-fit lg:pb-10 lg:w-[50rem] lg:rounded-2xl relative lg:scale-105'>
        <div className='relative pt-6 px-4 flex flex-row items-center border-b border-gray-700 pb-6'>
          <div className='lg:inline-block lg:absolute lg:left-0 lg:ml-6 lg:mt-0 mt-3 py-[0.5rem] lg:w-[6.5rem] w-[6.3rem] px-3 rounded'>
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
              <div className='relative min-h-min-content h-fit flex flex-col items-center w-full focus:outline-none'>
                <div className='w-full break-all relative h-fit mt-3 ml-8 pr-[4rem] rounded-[0.3rem] bg-transparent py-1 pl-4 text-input-gray italic border border-textarea-gray'>
                  {quote && quote.body.en}
                </div>
              </div>
              <p className='absolute top-8 right-9 text-textarea-gray'>Eng</p>
            </div>
          </div>
          <div className='relative w-full'>
            <div className='mr-10 pl-1'>
              <div className='relative min-h-min-content h-fit flex flex-col items-center w-full focus:outline-none'>
                <div className='w-full break-all relative h-fit mt-3 ml-8 pr-[4rem] rounded-[0.3rem] bg-transparent py-1 pl-4 text-input-gray italic border border-textarea-gray'>
                  {quote && quote.body.ka}
                </div>
              </div>
              <p className='absolute top-8 right-9 text-textarea-gray'>ქარ</p>
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

          <div className='px-6'>
            <div className='mt-3 lg:mt-5 flex pb-5 border-b-[0.1rem] border-gray-600'>
              <div className='flex flex-row items-center'>
                <p className='text-lg'>21</p>
                <Image
                  src='/assets/comments-quantity.png'
                  alt='comments quantity'
                  width={96}
                  height={92}
                  className='h-5 w-auto ml-2 lg:h-7'
                />
              </div>
              <div className='flex flex-row items-center ml-6'>
                <p className='text-lg block w-2'>23</p>
                <div
                  onClick={() => handleLike(authUserId, whichQuoteToView)}
                  className='hover:cursor-pointer z-[30]'
                >
                  <Heart
                    classes={`h-5 w-auto ml-5 lg:h-7 ${
                      quote?.likes?.some(
                        (like: Like) => like.user_id === authUserId
                      )
                        ? 'fill-like'
                        : 'fill-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='px-6'>
            {quote?.comments?.map((comment: Comment) => {
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
                      className='h-11 w-auto mr-2 lg:h-14 rounded-[50%]'
                    />
                    <p className='ml-3 lg:text-xl'>{comment.user.name}</p>
                  </div>
                  <p className='text-sm lg:text-lg lg:ml-[4.8rem] lg:mr-1 lg:-mt-4 break-all'>
                    {comment.body}
                  </p>
                  <div className='hidden lg:flex ml-[4.8rem] border-gray-600 border-b-[0.1rem] pb-6'></div>
                </div>
              );
            })}
          </div>
          <div className='mt-1 flex flex-row py-3 items-center px-6'>
            <Image
              src={
                authUserAvatar
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${authUserAvatar}`
                  : '/assets/avatar-default.png'
              }
              alt='user headshot'
              width={512}
              height={512}
              className='h-14 w-auto mr-2 rounded-[50%]'
            />
            <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:pr-5'>
              <input
                {...register('body', { required: true })}
                placeholder='Write a comment'
                className='bg-comment-input-bg py-[0.43rem] pl-3 rounded-lg w-full lg:ml-5'
              />
              <input
                {...register('user_id', { required: true })}
                type='hidden'
                name='user_id'
                defaultValue={authUserId}
              />
              <input
                {...register('quote_id', { required: true })}
                type='hidden'
                name='quote_id'
                defaultValue={whichQuoteToView}
              />
              <button className='hidden'></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewQuote;
