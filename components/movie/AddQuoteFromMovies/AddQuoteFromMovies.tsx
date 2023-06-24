import Image from 'next/image';
import { PropsType } from './types';
import useAddNewQuote from './useAddQuoteFromMovies';
import { Genre } from '@/types';

const AddQuoteFromMovies: React.FC<PropsType> = ({
  userName,
  avatar,
  userId,
  movieDirector,
  movieName,
  movieYear,
  moviePoster,
  movieId,
  movieGenres,
}) => {
  const {
    showAddQuoteFromMoviesPage: showAddQuote,
    locale,
    setShowMovieDropdown,
    imageName,
    handleUpload,
    handleSubmit,
    onSubmit,
    register,
    errors,
    handleMovieExistence,
    handleDrop,
    handleDragOver,
    imageError,
    t,
    translate,
  } = useAddNewQuote(movieId);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => {
        setShowMovieDropdown(false);
      }}
      className='z-50 lg:pb-16 bg-profile-dark-blue overflow-auto h-screen w-screen fixed backdrop-blur-sm lg:backdrop-blur-none bg-partly-transparent-dark lg:bg-violet-quote-create-bg lg:bg-opacity-70 text-white flex items-center justify-center top-0 left-0'
    >
      <div className='h-full lg:mt-[4rem] lg:bg-profile-dark-blue w-full lg:h-fit lg:pb-10 lg:w-[54rem] lg:rounded-2xl relative lg:scale-105'>
        <div className='relative pt-7 px-4 flex flex-row justify-center items-center border-b border-gray-700 pb-7'>
          <h1 className='text-xl'>{translate('Write new quote')}</h1>
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
        <div className='px-7 mt-6 lg:px-[2rem]'>
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
          <form noValidate onSubmit={handleSubmit(onSubmit)} className='pt-5'>
            <div className='relative min-h-[5.8rem] px-2 flex flex-row items-center justify-between w-full bg-black lg:bg-transparent rounded'>
              <div className='flex flex-row w-fulls items-start'>
                <Image
                  src={
                    moviePoster
                      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${moviePoster}`
                      : '/assets/movie-sample.png'
                  }
                  alt='movie poster'
                  width={512}
                  height={512}
                  className='h-[4.6rem] w-[6.5rem] lg:h-[10rem] lg:w-[20rem] mr-2 rounded-lg'
                />
                <div className='text-[0.75rem] flex flex-col lg:text-[1.2rem] py-[0.15rem] lg:ml-2'>
                  <p className='block w-[11.5rem] lg:w-[28rem] lg:mb-3 text-cream overflow-hidden whitespace-nowrap overflow-ellipsis'>{`${movieName} (${movieYear})`}</p>

                  <p className='block mt-1 w-[11.5rem] lg:w-[28rem] lg:mb-3 order-1 lg:order-2 overflow-hidden whitespace-nowrap overflow-ellipsis'>
                    <span className='font-semibold text-input-gray'>
                      Director:{' '}
                    </span>
                    {movieDirector}
                  </p>
                  <div className='flex flex-wrap mt-1 order-2 lg:order-1'>
                    {movieGenres.map((genre: Genre) => {
                      return (
                        <div
                          key={genre.id}
                          className={`px-1 text-[0.56rem] lg:text-sm lg:px-2 py-[0.2rem] text-white text-center bg-textarea-gray rounded mr-2 mb-2`}
                        >
                          <p className='text-center block'>
                            {genre.name[locale as keyof typeof genre.name]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='w-full h-[4.4rem] mt-4 items-center flex border border-textarea-gray bg-transparent rounded py-2 px-4'>
                <div className='flex flex-row justify-between w-full lg:justify-start'>
                  <div className='flex flex-row items-center'>
                    <Image
                      src='/assets/photo-camera.png'
                      alt='photo camera'
                      width={512}
                      height={512}
                      className='h-6 w-6 mr-3'
                    />
                    <p
                      className={`${
                        imageName && 'text-upload-btn-violet opacity-70'
                      } lg:hidden block text-sm w-32 overflow-hidden whitespace-nowrap overflow-ellipsis`}
                    >
                      {imageName || translate('Upload image')}
                    </p>
                    <p
                      className={`${
                        imageName && 'text-upload-btn-violet opacity-70'
                      } hidden lg:block max-w-[34.6rem] overflow-hidden whitespace-nowrap overflow-ellipsis`}
                    >
                      {imageName || translate('Drag & drop your image here or')}
                    </p>
                  </div>
                  <label className='relative lg:ml-4 bg-upload-btn-violet py-2 lg:px-[0.7rem] px-[0.4rem] bg-opacity-40 cursor-pointer'>
                    <span className='text-xs lg:text-base'>
                      {translate('Choose file')}
                    </span>
                    <input
                      {...register('image')}
                      name='image'
                      onChange={(e) => {
                        handleUpload(e);
                      }}
                      type='file'
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    />
                  </label>
                </div>
              </div>
              <div className='h-2 mt-1'>
                <p className='text-red text-xs'>{imageError && imageError}</p>
              </div>
            </div>
            <div className='relative mt-4'>
              <textarea
                {...register('bodyEn', {
                  required: `${t('This field is required')}`,
                  pattern: {
                    value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                    message: `${t('Only English text allowed')}`,
                  },
                })}
                className='w-full pr-12 focus:outline-none h-[5.2rem] border border-textarea-gray bg-transparent rounded py-2 px-4 placeholder-textarea-gray italic'
                placeholder='Start creating a new quote'
              />
              <p className='absolute top-3 right-4'>Eng</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.bodyEn && errors.bodyEn.message}
                </p>
              </div>
            </div>
            <div className='relative mt-3'>
              <textarea
                {...register('bodyGe', {
                  required: `${t('This field is required')}`,
                  pattern: {
                    value: /^[ა-ჰ\d,.()\s$?!#:@%^&*"']+$/,
                    message: `${t('Only Georgian text allowed')}`,
                  },
                })}
                className='w-full pr-12 focus:outline-none h-[5.2rem] border border-textarea-gray bg-transparent rounded py-2 px-4 placeholder-textarea-gray italic'
                placeholder='ახალი ციტატა'
              />
              <p className='absolute top-3 right-4'>ქარ</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.bodyGe && errors.bodyGe.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                handleMovieExistence(userId.toString());
              }}
              className='text-white w-full mb-10 lg:mb-0 lg:mt-6 mt-4 text-lg bg-red py-2 px-4 rounded-md hover:bg-red-hover'
              type='submit'
            >
              {translate('Post')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddQuoteFromMovies;
