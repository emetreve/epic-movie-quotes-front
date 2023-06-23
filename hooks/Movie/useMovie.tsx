import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useQuery } from 'react-query';
import { getMovie } from '@/services';
import { useTranslation } from 'next-i18next';
import { useUiContext } from '@/store';

const useMovie = () => {
  const router = useRouter();
  const { logged, user } = useCheckIfLoggedIn();

  const { locale } = useRouter();
  const { id } = router.query;

  const { t } = useTranslation('movies');

  const { showAddQuoteFromMoviesPage, showAddQuoteFromMovies } = useUiContext();

  const fetchMovie = async () => {
    try {
      const response = await getMovie(id as string);
      return response.data;
    } catch {
      router.push('/404');
    }
  };

  const { data: movie } = useQuery('movie', fetchMovie, {
    enabled: !!id,
  });

  return {
    id,
    logged,
    user,
    movie,
    locale,
    showAddQuoteFromMoviesPage,
    showAddQuoteFromMovies,
    t,
  };
};
export default useMovie;
