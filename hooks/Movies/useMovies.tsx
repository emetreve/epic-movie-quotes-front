import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';

const useMovies = () => {
  const { showBrugerMenu, showBurger } = useUiContext();
  const { logged, user } = useCheckIfLoggedIn();

  const handleOutsideClick = () => {
    if (showBrugerMenu) {
      showBurger(false);
    }
  };

  return { logged, user, handleOutsideClick };
};

export default useMovies;
