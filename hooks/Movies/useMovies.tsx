import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';
import { getUserMovies } from '@/services';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const useMovies = () => {
  const { showBrugerMenu, showBurger, showCreateMovie, showAddMovie } =
    useUiContext();
  const { logged, user } = useCheckIfLoggedIn();
  const { locale } = useRouter();
  const { t } = useTranslation('movies');

  const fetchUserMovies = async () => {
    const response = await getUserMovies();
    return response.data;
  };

  const { data: movies } = useQuery('usermovies', fetchUserMovies);

  const handleOutsideClick = () => {
    if (showBrugerMenu) {
      showBurger(false);
    }
  };

  return {
    movies,
    locale,
    logged,
    user,
    handleOutsideClick,
    showCreateMovie,
    showAddMovie,
    t,
  };
};

export default useMovies;
