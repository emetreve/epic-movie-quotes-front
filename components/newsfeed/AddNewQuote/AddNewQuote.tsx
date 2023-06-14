import Image from 'next/image';
import { PropsType } from './types';
import useAddNewQuote from './useAddNewQuote';
import { Movie } from '@/types';

const AddNewQuote: React.FC<PropsType> = ({ userName, avatar }) => {
  const {
    showAddQuote,
    movies,
    locale,
    selectedMovie,
    handleMovieChange,
    showMovieDropdown,
    setShowMovieDropdown,
    imageName,
    handleUpload,
    handleSubmit,
    onSubmit,
    register,
    errors,
    t,
  } = useAddNewQuote();

  return (
    <div
      onClick={() => {
        setShowMovieDropdown(false);
      }}
      className='z-50 scrollbar-hide h-screen w-screen fixed backdrop-blur-sm bg-partly-transparent-dark text-white flex items-center justify-center top-0 left-0'
    >
      <div className='bg-profile-dark-blue h-full w-full lg:h-[29rem] lg:w-[38rem] lg:rounded-2xl lg:px-[5rem] relative lg:scale-105'>
        <div className='relative pt-7 px-4 flex flex-row justify-center items-center border-b border-gray-700 pb-7'>
          <h1 className='text-xl'>Write new quote</h1>
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
        <div className='px-7 mt-7'>
          <div className='flex flex-row items-center lg:mb-4'>
            <Image
              src={avatar ? avatar : '/assets/avatar-default.png'}
              alt='user headshot'
              width={512}
              height={512}
              className='h-10 w-auto mr-3 lg:h-14'
            />
            <p className='lg:text-xl lg:block lg:ml-1'>{userName}</p>
          </div>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className='pt-8'>
            <div className='relative'>
              <textarea
                {...register('bodyEn', {
                  required: `${t('This field is required')}`,
                  pattern: {
                    value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                    message: `${t('Only English text allowed')}`,
                  },
                })}
                className='w-full focus:outline-none h-[5.2rem] border border-textarea-gray bg-transparent rounded py-2 px-4 placeholder-textarea-gray italic'
                placeholder='Start creating a new quote'
              />
              <p className='absolute top-3 right-4'>Eng</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.bodyEn && errors.bodyEn.message}
                </p>
              </div>
            </div>
            <div className='relative mt-5'>
              <textarea
                {...register('bodyGe', {
                  required: `${t('This field is required')}`,
                  pattern: {
                    value: /^[ა-ჰ\d,.()\s$?!#:@%^&*"']+$/,
                    message: `${t('Only Georgian text allowed')}`,
                  },
                })}
                className='w-full focus:outline-none h-[5.2rem] border border-textarea-gray bg-transparent rounded py-2 px-4 placeholder-textarea-gray italic'
                placeholder='ახალი ციტატა'
              />
              <p className='absolute top-3 right-4'>ქარ</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.bodyGe && errors.bodyGe.message}
                </p>
              </div>
            </div>
            <div className='mt-5 w-full h-[4.4rem] items-center flex border border-textarea-gray bg-transparent rounded py-2 px-4'>
              <div className='flex flex-row justify-between w-full'>
                <div className='flex flex-row items-center'>
                  <Image
                    src='/assets/photo-camera.png'
                    alt='photo camera'
                    width={512}
                    height={512}
                    className='h-6 w-6 mr-3 lg:h-14'
                  />
                  <p>{imageName || 'Upload image'}</p>
                </div>
                <label className='relative bg-upload-btn-violet py-2 px-[0.7rem] bg-opacity-40 cursor-pointer'>
                  <span>Choose file</span>
                  <input
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
            <div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMovieDropdown(!showMovieDropdown);
                }}
                className='relative h-[4.8rem] px-6 flex flex-row items-center justify-between w-full bg-black mt-7 rounded'
              >
                <div className='flex flex-row w-[60rem]'>
                  <Image
                    src='/assets/movie-camera.png'
                    alt='photo camera'
                    width={512}
                    height={512}
                    className='h-6 w-6 mr-3 lg:h-14'
                  />
                  <p className='w-56 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                    {selectedMovie.name[
                      locale as keyof typeof selectedMovie.name
                    ] || 'Select movie'}
                  </p>
                </div>
                {showMovieDropdown && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className='absolute bottom-24 left-0 w-full max-h-72 shadow-lg overflow-scroll bg-violet bg-opacity-[95%] rounded py-4'
                  >
                    {movies &&
                      movies.map((movie: Movie, index: number) => {
                        return (
                          <p
                            onClick={() => {
                              handleMovieChange(
                                movie.id.toString(),
                                movie.name
                              );
                            }}
                            key={movie.id}
                            className={`${
                              index !== 0 && 'pt-4'
                            } leading-tight block px-5`}
                          >
                            {movie.name[locale as keyof typeof movie.name]}
                          </p>
                        );
                      })}
                  </div>
                )}
                <div className='w-52 overflow-hidden'>
                  <div className='pointer-events-none absolute inset-y-0 right-2 flex items-center'>
                    <Image
                      src='/assets/switch.png'
                      alt='photo camera'
                      width={512}
                      height={512}
                      className='h-[0.6rem] w-[0.9rem] mr-3 lg:h-14'
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              className='text-white w-full mt-6 text-lg bg-red py-2 px-4 rounded-md hover:bg-red-hover'
              type='submit'
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddNewQuote;
