import { useUiContext } from '@/store';
import { getMovies } from '@/services';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const useAddNewQuote = () => {
  const { showAddQuote } = useUiContext();
  const router = useRouter();
  const locale = router.locale;

  const fetchMovies = async () => {
    const response = await getMovies();
    console.log('something');
    return response.data;
  };

  const { data: movies } = useQuery('movies', fetchMovies);

  return { showAddQuote, movies, locale };
};
export default useAddNewQuote;
