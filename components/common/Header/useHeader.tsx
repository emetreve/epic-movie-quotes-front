import { useState } from 'react';
import { useRouter } from 'next/router';
import { logOut } from '@/services';
import { useTranslation } from 'next-i18next';

const useHeader = () => {
  const [showBrugerMenu, setShowBurgerMenu] = useState(false);

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

  const showBurger = (show: boolean) => {
    setShowBurgerMenu(show);
    show
      ? document.body.classList.add('hide-scrollbar')
      : document.body.classList.remove('hide-scrollbar');
  };

  const handleNavigation = (address: string) => {
    setShowBurgerMenu(false);
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
