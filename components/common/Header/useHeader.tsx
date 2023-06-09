import { useState } from 'react';
import { useRouter } from 'next/router';
import { logOut } from '@/services';
import { useTranslation } from 'next-i18next';

const useHeader = () => {
  const [showBrugerMenu, setShowBurgerMenu] = useState(false);

  const { t } = useTranslation('newsfeed');

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
    setShowBurgerMenu(false);
    router.push(`/dashboard/${address}`);
  };

  return {
    handleLogout,
    t,
    showBrugerMenu,
    setShowBurgerMenu,
    handleNavigation,
    router,
  };
};
export default useHeader;
