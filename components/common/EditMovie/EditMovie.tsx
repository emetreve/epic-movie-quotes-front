import Image from 'next/image';
import useEditMovie from './useEditMovie';
import { PropsType, Genre } from './types';

const EditMovie: React.FC<PropsType> = ({ avatar, userName, movie }) => {
  const {
    showMovieEdit,
    handleSubmit,
    register,
    onSubmit,
    errors,
    genres,
    selectedGenres,
    handleGenreSelection,
    showGenresDropdown,
    setShowGenresDropdown,
    handleRemoveGenre,
    handleSubmitCheckForGenres,
    genreSelectionValid,
    locale,
    t,
  } = useEditMovie(movie);

  return (
    <div className='z-50 lg:pb-16 bg-profile-dark-blue overflow-auto h-screen w-screen fixed backdrop-blur-sm lg:backdrop-blur-none bg-partly-transparent-dark lg:bg-violet-quote-create-bg lg:bg-opacity-70 text-white flex items-center justify-center top-0 left-0'>
      <div className='h-full lg:mt-[13rem] lg:bg-profile-dark-blue w-full lg:h-fit lg:w-[54rem] lg:rounded-2xl relative lg:scale-105'>
        <div className='relative pt-7 px-4 flex flex-row justify-center items-center border-b border-gray-700 pb-7'>
          <h1 className='text-xl'>Edit movie</h1>
          <Image
            src='/assets/close-thin.png'
            alt='close modal'
            width={512}
            height={512}
            className='w-[0.9rem] h-[0.9rem] hover:cursor-pointer absolute right-8'
            onClick={() => {
              // setImageError('');
              showMovieEdit(false);
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
              <div className='relative flex items-center w-full overflow-hidden pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4'>
                <p className='absolute text-input-gray text-sm'>Movie name:</p>
                <input
                  {...register('nameEn', {
                    required: `${'This field is required'}`,
                    pattern: {
                      value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                      message: `${'Only English text allowed'}`,
                    },
                  })}
                  className='absolute w-full pr-[10rem] left-[6.7rem] focus:outline-nonebg-transparent bg-transparent'
                />
              </div>
              <p className='absolute top-3 right-4 text-textarea-gray'>Eng</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.nameEn && errors.nameEn.message}
                </p>
              </div>
            </div>
            <div className='relative'>
              <div className='relative flex items-center w-full overflow-hidden pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4'>
                <p className='absolute text-input-gray text-sm'>
                  ფილმის სახელი:
                </p>
                <input
                  {...register('nameGe', {
                    required: `${'This field is required'}`,
                    pattern: {
                      value: /^[ა-ჰ\d,.()\s$?!#:@%^&*"']+$/,
                      message: `${'Only Georgian text allowed'}`,
                    },
                  })}
                  className='absolute w-full pr-[12.1rem] left-[8.8rem] focus:outline-nonebg-transparent bg-transparent'
                />
              </div>
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
              <div className='flex flex-row lg:py-0'>
                <div className=''>
                  {selectedGenres.length > 0 ? (
                    <div className='flex flex-wrap mt-2'>
                      {selectedGenres.map((genre: Genre) => (
                        <div
                          key={genre.id}
                          className={`px-2 text-xs lg:text-base py-[0.3rem] text-white text-center bg-textarea-gray rounded mr-2 mb-2`}
                        >
                          <div className='flex flex-row items-center'>
                            <p className='text-center block'>
                              {genre.name[locale as keyof typeof genre.name]}
                            </p>
                            <Image
                              src='/assets/genre-remove.png'
                              alt='close modal'
                              height={539}
                              width={512}
                              className='w-[0.6rem] h-auto hover:cursor-pointer ml-[0.3rem]'
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
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{t('Select genres')}</p>
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
              <div className='relative flex items-center w-full overflow-hidden pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4'>
                <p className='absolute text-input-gray text-sm'>წელი/Year:</p>
                <input
                  {...register('year', {
                    required: `${'This field is required'}`,
                    pattern: {
                      value: /^\d+$/,
                      message: 'Please use only numbers',
                    },
                  })}
                  className='absolute w-full pr-[7rem] left-[6.2rem] focus:outline-nonebg-transparent bg-transparent'
                />
              </div>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.year && errors.year.message}
                </p>
              </div>
            </div>

            <div className='relative'>
              <div className='relative flex items-center w-full overflow-hidden pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4'>
                <p className='absolute text-input-gray text-sm'>
                  შემოსავალი/Revenue:
                </p>
                <input
                  {...register('revenue', {
                    required: `${'This field is required'}`,
                    pattern: {
                      value: /^\d+$/,
                      message: 'Please use only numbers',
                    },
                  })}
                  className='absolute w-full pr-[11.5rem] left-[10.7rem] focus:outline-nonebg-transparent bg-transparent'
                />
              </div>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.revenue && errors.revenue.message}
                </p>
              </div>
            </div>

            <div className='relative'>
              <div className='relative flex items-center w-full overflow-hidden pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4'>
                <p className='absolute text-input-gray text-sm'>Director:</p>
                <input
                  {...register('directorEn', {
                    required: `${'This field is required'}`,
                    pattern: {
                      value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                      message: `${'Only English text allowed'}`,
                    },
                  })}
                  className='absolute w-full pr-[8.3rem] left-[5rem] focus:outline-nonebg-transparent bg-transparent'
                />
              </div>
              <p className='absolute top-3 right-4 text-textarea-gray'>Eng</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.directorEn && errors.directorEn.message}
                </p>
              </div>
            </div>

            <div className='relative'>
              <div className='relative flex items-center w-full overflow-hidden pr-12 focus:outline-none h-[3.2rem] border border-textarea-gray bg-transparent rounded px-4'>
                <p className='absolute text-input-gray text-sm'>რეჟისორი:</p>
                <input
                  {...register('directorGe', {
                    required: `${'This field is required'}`,
                    pattern: {
                      value: /^[ა-ჰ\d,.()\s$?!#:@%^&*"']+$/,
                      message: `${'Only Georgian text allowed'}`,
                    },
                  })}
                  className='absolute w-full pr-[9.4rem] left-[6rem] focus:outline-nonebg-transparent bg-transparent'
                />
              </div>
              <p className='absolute top-3 right-4 text-textarea-gray'>ქარ</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.directorGe && errors.directorGe.message}
                </p>
              </div>
            </div>

            <div className='relative'>
              <div className='relative h-[6rem] flex flex-col items-center w-full overflow-hidden pr-12 focus:outline-none border border-textarea-gray bg-transparent rounded px-4'>
                <p className='absolute block pt-2 text-input-gray text-sm left-4'>
                  Movie description:
                </p>
                <textarea
                  {...register('descriptionEn', {
                    required: `${'This field is required'}`,
                    pattern: {
                      value: /^[\w,.,()\s$?!#@%:^&*"']+$/,
                      message: `${'Only English text allowed'}`,
                    },
                  })}
                  className='w-full absolute mt-8 ml-8 pr-11 focus:outline-none bg-transparent py-2 px-4 placeholder-white'
                  placeholder='Movie description'
                />
              </div>
              <p className='absolute top-3 right-4 text-textarea-gray'>Eng</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.descriptionEn && errors.descriptionEn.message}
                </p>
              </div>
            </div>

            <div className='relative'>
              <div className='relative h-[6rem] flex flex-col items-center w-full overflow-hidden pr-12 focus:outline-none border border-textarea-gray bg-transparent rounded px-4'>
                <p className='absolute block pt-2 text-input-gray text-sm left-4'>
                  ფილმის აღწერა:
                </p>
                <textarea
                  {...register('descriptionGe', {
                    required: `${'This field is required'}`,
                    pattern: {
                      value: /^[ა-ჰ\d,.()\s$?!#:@%^&*"']+$/,
                      message: `${'Only Georgian text allowed'}`,
                    },
                  })}
                  className='w-full absolute mt-8 ml-8 pr-11 focus:outline-none bg-transparent py-2 px-4 placeholder-white'
                  placeholder='Movie description'
                />
              </div>
              <p className='absolute top-3 right-4 text-textarea-gray'>ქარ</p>
              <div className='h-2'>
                <p className='text-red text-xs'>
                  {errors.descriptionGe && errors.descriptionGe.message}
                </p>
              </div>
            </div>

            {/* <div className='-mt-1 w-full h-[4.4rem] items-center flex border border-textarea-gray bg-transparent rounded py-2 px-4'>
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
                    {imageName || t('Upload image')}
                  </p>
                  <p
                    className={`${
                      imageName && 'text-upload-btn-violet opacity-70'
                    } hidden lg:block max-w-[34.6rem] overflow-hidden whitespace-nowrap overflow-ellipsis`}
                  >
                    {imageName || t('Drag & drop your image here or')}
                  </p>
                </div>
                <label className='relative lg:ml-4 bg-upload-btn-violet py-2 lg:px-[0.7rem] px-[0.4rem] bg-opacity-40 cursor-pointer'>
                  <span className='text-xs lg:text-base'>
                    {t('Choose file')}
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
            </div> */}
          </div>
          <button
            // onClick={handleSubmitCheckForGenres}
            className='text-white mb-[4rem] lg:mb-12 w-full lg:mt-8 mt-10 text-lg bg-red py-2 px-4 rounded-md hover:bg-red-hover'
            type='submit'
          >
            Edit movie
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditMovie;
