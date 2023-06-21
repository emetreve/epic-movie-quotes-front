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
    showGenresDropdown,
    setShowGenresDropdown,
    handleRemoveGenre,
    handleSubmitCheckForGenres,
    genreSelectionValid,
    handleUpload,
    handleDrop,
    handleDragOver,
    imageName,
    imageError,
    setImageError,
  } = useAddNewMovie();

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => {
        setShowGenresDropdown(false);
      }}
      className='z-50 lg:pb-16 bg-profile-dark-blue overflow-auto h-screen w-screen fixed backdrop-blur-sm lg:backdrop-blur-none bg-partly-transparent-dark lg:bg-violet-quote-create-bg lg:bg-opacity-70 text-white flex items-center justify-center top-0 left-0'
    >
      <div className='h-full lg:mt-[13rem] lg:bg-profile-dark-blue w-full lg:h-fit lg:w-[54rem] lg:rounded-2xl relative lg:scale-105'>
        <div className='relative pt-7 px-4 flex flex-row justify-center items-center border-b border-gray-700 pb-7'>
          <h1 className='text-xl'>Add movie</h1>
          <Image
            src='/assets/close-thin.png'
            alt='close modal'
            width={512}
            height={512}
            className='w-[0.9rem] h-[0.9rem] hover:cursor-pointer absolute right-8'
            onClick={() => {
              setImageError('');
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
                e.stopPropagation();
                setShowGenresDropdown((prev) => !prev);
              }}
              className='relative mb-2 min-h-[3.5rem] focus:outline-none border border-textarea-gray px-5 flex flex-row items-center justify-between w-full bg-transparent rounded'
            >
              <div className='flex flex-row py-[0.2rem] lg:py-0'>
                <div className=''>
                  {selectedGenres.length > 0 ? (
                    <div className='grid grid-cols-3 text-sm lg:text-base lg:grid-cols-7 lg:gap-x-4 gap-x-4'>
                      {selectedGenres.map((genre: Genre) => {
                        return (
                          <div
                            key={genre.id}
                            className='flex lg:w-[6.5rem] w-[5.7rem] flex-row items-center my-2 py-[0.3rem] lg:py-[0.4rem] lg:mr-3 mr-1 justify-center bg-textarea-gray bg-opacity-95 rounded'
                          >
                            <p className='text-center block mr-2 w-fit'>
                              {genre.name[locale as keyof typeof genre.name]}
                            </p>
                            <Image
                              src='/assets/genre-remove.png'
                              alt='close modal'
                              height={539}
                              width={512}
                              className='w-[0.6rem] h-auto hover:cursor-pointer'
                              onClick={(
                                e: React.MouseEvent<
                                  HTMLImageElement,
                                  MouseEvent
                                >
                              ) => {
                                handleRemoveGenre(e, genre.id);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>Select genres</p>
                  )}
                </div>
              </div>
              {showGenresDropdown && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`container absolute z-50 lg:bottom-[4.5rem] ${
                    selectedGenres.length < 4
                      ? 'bottom-[4rem]'
                      : 'bottom-[6.7rem]'
                  } left-0 w-full max-h-72 shadow-lg overflow-y-scroll bg-violet bg-opacity-[95%] rounded py-4`}
                >
                  {genres &&
                    genres.map((genre: Genre, index: number) => {
                      return (
                        <p
                          onClick={() => {
                            handleGenreSelection(genre);
                          }}
                          key={genre.id}
                          className={`${
                            index !== 0 && 'pt-4'
                          } leading-tight block px-6 hover:cursor-pointer`}
                        >
                          {genre.name[locale as keyof typeof genre.name]}
                        </p>
                      );
                    })}
                </div>
              )}
              <div className='h-2 absolute -bottom-2 left-0'>
                <p className='text-red text-xs'>{genreSelectionValid}</p>
              </div>
            </div>

            <div className='relative'>
              <input
                {...register('year', {
                  required: `${'This field is required'}`,
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please use only numbers',
                  },
                })}
                className='w-full pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4 placeholder-white'
                placeholder='წელი/Year'
              />
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.year && errors.year.message}
                </p>
              </div>
            </div>

            <div className='relative'>
              <input
                {...register('directorEn', {
                  required: `${'This field is required'}`,
                  pattern: {
                    value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                    message: `${'Only English text allowed'}`,
                  },
                })}
                className='w-full pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4 placeholder-white'
                placeholder='Director'
              />
              <p className='absolute top-3 right-4 text-textarea-gray'>Eng</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.directorEn && errors.directorEn.message}
                </p>
              </div>
            </div>

            <div className='relative'>
              <input
                {...register('directorGe', {
                  required: `${'This field is required'}`,
                  pattern: {
                    value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                    message: `${'Only Georgian text allowed'}`,
                  },
                })}
                className='w-full pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4 placeholder-white'
                placeholder='რეჟისორი'
              />
              <p className='absolute top-3 right-4 text-textarea-gray'>ქარ</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.directorGe && errors.directorGe.message}
                </p>
              </div>
            </div>
            <div className='relative'>
              <textarea
                {...register('descriptionEn', {
                  required: `${'This field is required'}`,
                  pattern: {
                    value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                    message: `${'Only English text allowed'}`,
                  },
                })}
                className='w-full pr-12 focus:outline-none h-[5.2rem] border border-textarea-gray bg-transparent rounded py-2 px-4 placeholder-white'
                placeholder='Movie discription'
              />
              <p className='absolute top-3 right-4 text-textarea-gray'>ქარ</p>
              <div className='h-2 -mt-1'>
                <p className='text-red text-xs'>
                  {errors.descriptionEn && errors.descriptionEn.message}
                </p>
              </div>
            </div>
            <div className='relative -mt-1'>
              <textarea
                {...register('descriptionGe', {
                  required: `${'This field is required'}`,
                  pattern: {
                    value: /^[ა-ჰ\d,.()\s$?!#:@%^&*"']+$/,
                    message: `${'Only Georgian text allowed'}`,
                  },
                })}
                className='w-full pr-12 focus:outline-none h-[5.2rem] border border-textarea-gray bg-transparent rounded py-2 px-4 placeholder-white'
                placeholder='ფილმის აღწერა'
              />
              <p className='absolute top-3 right-4 text-textarea-gray'>ქარ</p>
              <div className='h-2 -mt-1'>
                <p className='text-red text-xs'>
                  {errors.descriptionGe && errors.descriptionGe.message}
                </p>
              </div>
            </div>
            <div className='-mt-1 w-full h-[4.4rem] items-center flex border border-textarea-gray bg-transparent rounded py-2 px-4'>
              <div className='flex flex-row justify-between w-full lg:justify-start'>
                <div className='flex flex-row items-center'>
                  <Image
                    src='/assets/photo-camera.png'
                    alt='photo camera'
                    width={512}
                    height={512}
                    className='h-6 w-6 mr-3'
                  />
                  <p className='lg:hidden block text-sm w-32 overflow-hidden whitespace-nowrap overflow-ellipsis'>
                    {imageName || 'Upload image'}
                  </p>
                  <p className='hidden lg:block max-w-[34.6rem] overflow-hidden whitespace-nowrap overflow-ellipsis'>
                    {imageName || 'Drag & drop your image here or'}
                    IMAGE NAME
                  </p>
                </div>
                <label className='relative lg:ml-4 bg-upload-btn-violet py-2 lg:px-[0.7rem] px-[0.4rem] bg-opacity-40 cursor-pointer'>
                  <span className='text-xs lg:text-base'>
                    {/* {translate('Choose file')} */}
                    Choose file
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
            <div className='h-2 -mt-3'>
              <p className='text-red text-xs'>{imageError && imageError}</p>
            </div>
          </div>
          <button
            onClick={handleSubmitCheckForGenres}
            className='text-white mb-[4rem] lg:mb-12 w-full lg:mt-8 mt-10 text-lg bg-red py-2 px-4 rounded-md hover:bg-red-hover'
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
