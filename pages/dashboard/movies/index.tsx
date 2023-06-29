import { Header, SideProfilePanel, AddNewMovie } from '@/components';
import { useMovies } from '@/hooks';
import Image from 'next/image';
import { MovieForMoviesPage } from '@/types';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Movies = () => {
  const {
    movies,
    locale,
    user,
    logged,
    handleOutsideClick,
    showCreateMovie,
    showAddMovie,
    showSearchLg,
    setShowSearchLg,
    setFocused,
    register,
    handleSubmit,
    onSubmit,
    searchTracker,
    searchResult,
    handleBlur,
    handleMovieListingClick,
    t,
  } = useMovies();

  if (logged) {
    return (
      <>
        {showCreateMovie && (
          <AddNewMovie
            userName={user.name}
            userId={user.id}
            avatar={user.avatar}
          />
        )}
        <div
          id='movies'
          onClick={handleOutsideClick}
          className='min-h-screen bg-gradient-violet relative'
        >
          <div className='h-[5rem]'>
            <Header
              hideSearch={true}
              userName={user.name}
              avatar={user.avatar}
              authUserId={user.id}
            />
          </div>

          <div className='w-[25%] fixed'>
            <SideProfilePanel avatar={user.avatar} name={user.name} />
          </div>

          <div className='lg:px-[4rem] px-7 pb-16 lg:ml-[25%] lg:w-[75%] w-full lg:mt-[2rem]'>
            <div className='text-white lg:mb-1'>
              <div className='flex flex-row justify-between items-center mt-2'>
                <div
                  className={`flex flex-row items-center ${
                    locale === 'ka' && 'font-helvetica-caps-ka'
                  }`}
                >
                  <p className='text-xl lg:text-xl'>{t('My list of movies')}</p>
                  <p className='lg:block hidden ml-2 lg:text-xl'>{`(${t(
                    'Total'
                  )} ${movies ? movies.length : 0})`}</p>
                </div>
                <div className='flex flex-row'>
                  <div
                    className={`${
                      showSearchLg
                        ? 'pl-6 w-[20rem] border-b border-slate-600 pb-3 ml-12 relative'
                        : 'mr-3'
                    } hidden lg:flex h-12 flex-row items-center text-lg`}
                  >
                    <Image
                      src='/assets/search-magnifying-glass.png'
                      alt='search magnifying glass'
                      width={96}
                      height={96}
                      onClick={() => {
                        setShowSearchLg(true);
                      }}
                      className={`${
                        showSearchLg && 'px-0 mx-0 absolute left-1'
                      } h-[1.2rem] w-auto mr-5 hover:cursor-pointer z-30`}
                    />
                    {showSearchLg ? (
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                        className='w-full relative text-gray-400 z-40'
                      >
                        <p
                          className={`${
                            searchTracker?.length > 0 && 'text-transparent'
                          } ml-5`}
                        >
                          Search movie
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <input
                            {...register('search')}
                            id='search'
                            className='text-white w-full pl-1 ml-4 bg-transparent bottom-[0.01rem] absolute'
                            name='search'
                            onFocus={() => setFocused(true)}
                            onBlur={handleBlur}
                          />
                        </form>
                      </div>
                    ) : (
                      <p
                        onClick={() => {
                          setShowSearchLg(true);
                          setFocused(true);
                        }}
                        className='text-gray-400 hover:cursor-pointer z-30 relative'
                      >
                        {t('Search by')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      showAddMovie(true);
                    }}
                    className={`text-white z-10 bg-red py-[0.5rem] px-3 ml-5 ${
                      locale === 'ka' ? 'px-0 text-sm' : 'px-3'
                    }  hover:bg-red-hover rounded-md font-thin lg:text-lg text-[1.1rem]`}
                  >
                    <div className='flex flex-row items-center'>
                      <Image
                        src='/assets/create-new.png'
                        alt='create new'
                        width={96}
                        height={96}
                        className='w-4 h-auto hover:cursor-pointer mr-2'
                      />
                      {t('Add movie')}
                    </div>
                  </button>
                </div>
              </div>
              <p className='block lg:hidden'>{`(${t('Total')} ${
                movies ? movies.length : 0
              })`}</p>
            </div>
            <div
              className={`lg:grid lg:grid-cols-3 gap-x-20 lg:w-full ${
                locale === 'en' ? 'uppercase' : 'font-helvetica-caps-ka'
              }`}
            >
              {movies &&
                searchResult.length < 1 &&
                movies.map((movie: MovieForMoviesPage, index: number) => {
                  return (
                    <div
                      key={movie.id}
                      onClick={() => {
                        handleMovieListingClick(movie.id);
                      }}
                      className={`${
                        index === 0 ? 'mt-6 lg:mt-12' : 'mt-12'
                      } hover:cursor-pointer`}
                    >
                      <div className='w-full lg:w-[25rem] lg:h-[20rem] h-full max-h-[17rem] lg:max-h-[20rem] mt-7 hover:cursor-pointer mr-2 rounded-xl overflow-hidden'>
                        <Image
                          src={
                            movie?.poster
                              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${movie.poster}`
                              : '/assets/movie-sample.png'
                          }
                          alt='poster'
                          width={2000}
                          height={2000}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <p className='text-white text-lg mt-4'>
                        {`${movie.name[locale]} (${movie.year})`}
                      </p>
                      <div className='flex flex-row items-center text-white mt-4'>
                        <p className='text-lg'>{movie.quotes_count}</p>
                        <Image
                          src='/assets/quote-notification.png'
                          alt='quote'
                          width={96}
                          height={96}
                          className='w-5 h-auto ml-2'
                        />
                      </div>
                    </div>
                  );
                })}

              {searchResult.length > 0 &&
                searchResult.map((movie: MovieForMoviesPage, index: number) => {
                  return (
                    <div
                      key={movie.id}
                      onClick={() => {
                        handleMovieListingClick(movie.id);
                      }}
                      className={`${
                        index === 0 ? 'mt-6 lg:mt-12' : 'mt-12'
                      } hover:cursor-pointer`}
                    >
                      <div className='w-full lg:w-[25rem] lg:h-[20rem] h-full max-h-[17rem] lg:max-h-[20rem] mt-7 hover:cursor-pointer mr-2 rounded-xl overflow-hidden'>
                        <Image
                          src={
                            movie?.poster
                              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${movie.poster}`
                              : '/assets/movie-sample.png'
                          }
                          alt='poster'
                          width={2000}
                          height={2000}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <p className='text-white text-lg mt-4'>
                        {`${movie.name[locale]} (${movie.year})`}
                      </p>
                      <div className='flex flex-row items-center text-white mt-4'>
                        <p className='text-lg'>{movie.quotes_count}</p>
                        <Image
                          src='/assets/quote-notification.png'
                          alt='quote'
                          width={96}
                          height={96}
                          className='w-5 h-auto ml-2'
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Movies;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        'movies',
        'newsfeed',
        'profile',
      ])),
    },
  };
};
