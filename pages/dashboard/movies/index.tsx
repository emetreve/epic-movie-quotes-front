import { Header } from '@/components';
import { useMovies } from '@/hooks';
import Image from 'next/image';
import { MovieForMoviesPage } from '@/types';

const Movies = () => {
  const { movies, locale, user, logged, handleOutsideClick } = useMovies();
  if (logged) {
    return (
      <div
        onClick={handleOutsideClick}
        className='min-h-screen bg-gradient-violet'
      >
        <div className='h-[5rem]'>
          <Header
            hideSearch={true}
            userName={user.name}
            avatar={user.avatar}
            authUserId={user.id}
          />
        </div>
        <div className='text-white px-7'>
          <div className='flex flex-row justify-between items-center mt-2'>
            <p className='text-xl'>My list of movies</p>
            <button className='text-white bg-red py-[0.5rem] px-3  hover:bg-red-hover rounded-md font-thin text-[1.1rem]'>
              <div className='flex flex-row items-center'>
                <Image
                  src='/assets/create-new.png'
                  alt='create new'
                  width={96}
                  height={96}
                  className='w-4 h-auto hover:cursor-pointer mr-2'
                />
                Add movie
              </div>
            </button>
          </div>
          <p>{`(Total ${movies ? movies.length : 0})`}</p>
        </div>
        <div className='px-7 pb-16'>
          {movies &&
            movies.map((movie: MovieForMoviesPage, index: number) => {
              return (
                <div
                  key={movie.id}
                  className={`${index === 0 ? 'mt-6' : 'mt-12'}`}
                >
                  <Image
                    src={
                      movie.poster
                        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${movie.poster}`
                        : '/assets/movie-sample.png'
                    }
                    alt='create new'
                    width={96}
                    height={96}
                    className='w-full h-auto hover:cursor-pointer mr-2 rounded-2xl'
                  />
                  <p className='text-white text-lg mt-4'>
                    {`${movie.name[locale as keyof typeof movie.name]} (${
                      movie.year
                    })`}
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
    );
  }
};
export default Movies;
