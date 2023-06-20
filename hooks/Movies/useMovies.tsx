import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';
import { getMovies } from '@/services';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const useMovies = () => {
  const { showBrugerMenu, showBurger } = useUiContext();
  const { logged, user } = useCheckIfLoggedIn();
  const { locale } = useRouter();

  const fetchMovies = async () => {
    const response = await getMovies();
    return response.data;
  };

  const { data: movies } = useQuery('movies', fetchMovies);

  const handleOutsideClick = () => {
    if (showBrugerMenu) {
      showBurger(false);
    }
  };

  return { movies, locale, logged, user, handleOutsideClick };
};

export default useMovies;
