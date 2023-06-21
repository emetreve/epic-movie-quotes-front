import Image from 'next/image';
import { PropsType } from './types';
import useAddNewMovie from './useAddNewMovie';
import { Genre } from '@/types';

const AddNewMovie: React.FC<PropsType> = ({ avatar, userName }) => {
  const {
    showAddMovie,
    handleSubmit,
    onSubmit,
    register,
    errors,
    genres,
    selectedGenres,
    locale,
    handleGenreSelection,
  } = useAddNewMovie();

  console.log(genres);

  return (
    <div
      //   onDrop={handleDrop}
      //   onDragOver={handleDragOver}
      //   onClick={() => {
      //     setShowMovieDropdown(false);
      //   }}
      className='z-50 lg:pb-16 scrollbar-hide h-screen w-screen fixed backdrop-blur-sm lg:backdrop-blur-none bg-partly-transparent-dark lg:bg-violet-quote-create-bg lg:bg-opacity-70 text-white flex items-center justify-center top-0 left-0'
    >
      <div className='bg-profile-dark-blue h-full w-full lg:h-[47.5rem] lg:w-[54rem] lg:rounded-2xl relative lg:scale-105'>
        <div className='relative pt-7 px-4 flex flex-row justify-center items-center border-b border-gray-700 pb-7'>
          <h1 className='text-xl'>Add movie</h1>
          <Image
            src='/assets/close-thin.png'
            alt='close modal'
            width={512}
            height={512}
            className='w-[0.9rem] h-[0.9rem] hover:cursor-pointer absolute right-8'
            onClick={() => {
              showAddMovie(false);
            }}
          />
        </div>
        <div className='px-7 mt-7 lg:px-[2rem]'>
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
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className='px-7 mt-6'
        >
          <div className='flex flex-col gap-4'>
            <div className='relative'>
              <input
                {...register('nameEn', {
                  required: `${'This field is required'}`,
                  pattern: {
                    value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                    message: `${'Only English text allowed'}`,
                  },
                })}
                className='w-full pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4 placeholder-white'
                placeholder='Movie name'
              />
              <p className='absolute top-3 right-4 text-textarea-gray'>Eng</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.nameEn && errors.nameEn.message}
                </p>
              </div>
            </div>
            <div className='relative'>
              <input
                {...register('nameGe', {
                  required: `${'This field is required'}`,
                  pattern: {
                    value: /^[ა-ჰ\d,.()\s$?!#:@%^&*"']+$/,
                    message: `${'Only Georgian text allowed'}`,
                  },
                })}
                className='w-full pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4 placeholder-white'
                placeholder='ფილმის სახელი'
              />
              <p className='absolute top-3 right-4 text-textarea-gray'>ქარ</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.nameGe && errors.nameGe.message}
                </p>
              </div>
            </div>
            <div
              onClick={(e) => {
                //   e.stopPropagation();
                //   setShowMovieDropdown(!showMovieDropdown);
              }}
              className='relative min-h-[3.2rem] focus:outline-none border border-textarea-gray px-6 flex flex-row items-center justify-between w-full bg-transparent rounded'
            >
              <div className='flex flex-row w-[60rem]'>
                <div className='w-56 lg:w-[37rem] whitespace-nowrap overflow-hidden overflow-ellipsis'>
                  {selectedGenres.length > 0 ? (
                    <div className='flex gap-x-1'>
                      {selectedGenres.map((genre: Genre) => {
                        return (
                          <p key={genre.id}>
                            {genre.name[locale as keyof typeof genre.name]}
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <p>Select genres</p>
                  )}
                </div>
              </div>
              {true && (
                <div
                  onClick={(e) => {
                    //   e.stopPropagation();
                  }}
                  className='container absolute z-50 bottom-14 left-0 w-full max-h-72 shadow-lg overflow-y-scroll bg-violet bg-opacity-[95%] rounded py-4'
                >
                  {genres &&
                    genres.map((genre: Genre, index: number) => {
                      return (
                        <p
                          onClick={() => {
                            handleGenreSelection(genre);
                            //   handleMovieChange(movie.id.toString(), movie.name);
                            //   setMovieError('');
                          }}
                          key={genre.id}
                          className={`${
                            index !== 0 && 'pt-4'
                          } leading-tight block px-6`}
                        >
                          {genre.name[locale as keyof typeof genre.name]}
                        </p>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              // handleMovieExistence(userId.toString());
            }}
            className='text-white w-full lg:mt-6 mt-4 text-lg bg-red py-2 px-4 rounded-md hover:bg-red-hover'
            type='submit'
          >
            Add movie
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddNewMovie;
