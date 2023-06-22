import { useMovie } from '@/hooks';

const Movie = () => {
  const { id } = useMovie();

  return <div className='text-2xl'> {id}</div>;
};

export default Movie;
