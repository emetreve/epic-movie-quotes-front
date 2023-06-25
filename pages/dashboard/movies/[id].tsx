import { useMovie } from '@/hooks';
import Image from 'next/image';
import {
  Header,
  SideProfilePanel,
  QuoteListing,
  AddQuoteFromMovies,
  EditMovie,
  ViewQuote,
} from '@/components';
import { Genre, QuoteFromMoviePage } from '@/types';
import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Movie = () => {
  const {
    locale,
    logged,
    user,
    movie,
    showAddQuoteFromMoviesPage,
    showAddQuoteFromMovies,
    whichQuoteModalIsOpen,
    setWhichQuoteModalIsOpen,
    handleDelete,
    showEditMovie,
    showMovieEdit,
    handleOutsideClick,
    whichQuoteToView,
    setWhichQuoteToView,
    t,
  } = useMovie();

  if (logged && movie) {
    return (
      <>
        <div
          id='movie'
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

          {whichQuoteToView && (
            <ViewQuote
              authUserId={user.id}
              authUserAvatar={user.avatar}
              authUserName={user.name}
              whichQuoteToView={whichQuoteToView}
              setWhichQuoteToView={setWhichQuoteToView}
            />
          )}

          {showEditMovie && (
            <EditMovie
              userName={user.name}
              userId={user.id}
              avatar={user.avatar}
              movie={movie}
            />
          )}

          {showAddQuoteFromMovies && (
            <AddQuoteFromMovies
              userName={user.name}
              avatar={user.avatar}
              userId={user.id}
              moviePoster={movie.poster}
              movieName={movie.name[locale as keyof typeof movie.name]}
              movieYear={movie.year}
              movieDirector={
                movie.director[locale as keyof typeof movie.director]
              }
              movieGenres={movie.genres}
              movieId={movie.id}
            />
          )}

          <div className='w-[25%] fixed'>
            <SideProfilePanel avatar={user.avatar} name={user.name} />
          </div>

          <div className='lg:px-[4rem] px-7 pb-8 lg:ml-[25%] lg:w-[75%] w-full lg:mt-[2rem]'>
            <div className='text-xl text-white mt-3 lg:block hidden'>
              <p>{t('Movie description')}</p>
            </div>
            <div className='lg:flex flex-row'>
              <Image
                src={
                  movie?.poster
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${movie.poster}`
                    : '/assets/movie-sample.png'
                }
                alt='poster'
                width={96}
                height={96}
                className='w-full lg:w-[43rem] lg:max-h-[24rem] mt-7 h-full hover:cursor-pointer mr-2 rounded-xl'
              />
              <div className='lg:mt-2 mt-3 lg:py-5 lg:relative ml-2 break-all lg:w-[36.5rem]'>
                <h1 className='text-cream inline text-xl mt-5 lg:w-[29rem]'>
                  {`${movie?.name[locale as keyof typeof movie.name]} (${
                    movie?.year
                  })`}
                </h1>
                <div className='lg:inline-block lg:absolute lg:right-0 lg:ml-6 lg:mt-0 mt-3 bg-violet py-[0.5rem] lg:w-[6.5rem] w-[6.3rem] px-3 rounded'>
                  <div className='flex flex-row gap-x-5 items-center justify-end'>
                    <div className='flex'>
                      <Image
                        onClick={() => {
                          showMovieEdit(true);
                        }}
                        src='/assets/edit.png'
                        alt='edit quote'
                        width={80}
                        height={80}
                        className='h-[0.93rem] w-auto lg:ml-0 ml-1 hover:cursor-pointer'
                      />
                    </div>
                    <div className='border-r border-gray-600 h-3 mr-[0.1rem]'></div>
                    <div className='flex'>
                      <Image
                        onClick={() => {
                          handleDelete(movie.id);
                        }}
                        src='/assets/delete.png'
                        alt='delete quote'
                        width={70}
                        height={80}
                        className='h-[0.9rem] w-auto mr-2 hover:cursor-pointer'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-wrap mt-4'>
                  {movie?.genres.map((genre: Genre) => (
                    <div
                      key={genre.id}
                      className={`px-3 text-xs lg:text-base py-[0.3rem] text-white text-center bg-textarea-gray rounded mr-2 mb-2`}
                    >
                      <p className='text-center block'>
                        {genre.name[locale as keyof typeof genre.name]}
                      </p>
                    </div>
                  ))}
                </div>
                <p className='text-white mt-2'>
                  <span className='text-input-gray mr-2 font-semibold'>
                    Director:
                  </span>
                  {movie?.director[locale as keyof typeof movie.director]}
                </p>
                <p className='text-input-gray mt-3'>
                  {movie?.description[locale as keyof typeof movie.description]}
                </p>
                <div className='lg:hidden py-8 border-b border-gray-600 border-opacity-80'>
                  <button
                    onClick={() => {
                      showAddQuoteFromMoviesPage(true);
                    }}
                    className={`text-white z-10 bg-red py-[0.5rem] px-3 ${
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
                      Add quote
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:px-[4rem] lg:ml-[25%] lg:w-[75%]'>
            <div className='text-white mb-6 px-1 lg:flex lg:flex-row lg:items-center'>
              <div className='lg:border-r border-gray-600 w-fit lg:flex lg:flex-row lg:pr-3 px-7 lg:px-0'>
                <p className='text-2xl'>All quotes</p>
                <p className='lg:text-2xl lg:ml-2'>{`(Total: ${movie?.quotes_count})`}</p>
              </div>
              <div className='hidden lg:block ml-3'>
                <button
                  onClick={() => {
                    showAddQuoteFromMoviesPage(true);
                  }}
                  className={`text-white z-10 bg-red py-[0.5rem] px-3 ${
                    locale === 'ka' ? 'px-0 text-sm' : 'px-3'
                  } hover:bg-red-hover rounded-md font-thin lg:text-lg text-[1.1rem]`}
                >
                  <div className='flex flex-row items-center'>
                    <Image
                      src='/assets/create-new.png'
                      alt='create new'
                      width={96}
                      height={96}
                      className='w-4 h-auto hover:cursor-pointer mr-2'
                    />
                    Add quote
                  </div>
                </button>
              </div>
            </div>
            <div className='lg:pb-28 pb-20'>
              {movie?.quotes?.map(
                (quote: QuoteFromMoviePage, index: number) => {
                  return (
                    <div
                      key={quote.id}
                      className={`${
                        index !== movie.quotes.length - 1 && 'mb-8'
                      }`}
                    >
                      <QuoteListing
                        quoteId={quote.id}
                        image={quote.image}
                        body={quote.body}
                        likesCount={quote.likes_count}
                        commentsCount={quote.comments_count}
                        likes={quote.likes}
                        authUserId={user.id}
                        whichModalOpen={whichQuoteModalIsOpen}
                        setWhichModalOpen={setWhichQuoteModalIsOpen}
                        viewQuote={setWhichQuoteToView}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Movie;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

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
