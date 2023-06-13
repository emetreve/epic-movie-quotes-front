import { useRouter } from 'next/router';
import { logOut } from '@/services';
import { useTranslation } from 'next-i18next';
import { useUiContext } from '@/store';

const useHeader = () => {
  const { showBrugerMenu, showBurger } = useUiContext();

  const { t } = useTranslation(['newsfeed', 'profile']);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = (address: string) => {
    showBurger(false);
    router.push(`/dashboard/${address}`);
  };

  return {
    handleLogout,
    t,
    showBrugerMenu,
    showBurger,
    handleNavigation,
    router,
  };
};
export default useHeader;
