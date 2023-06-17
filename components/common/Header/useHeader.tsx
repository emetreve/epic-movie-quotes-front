import { useState } from 'react';
import { useRouter } from 'next/router';
import { logOut } from '@/services';
import { useTranslation } from 'next-i18next';
import { useUiContext } from '@/store';
import { getNotifications } from '@/services';
import { useQuery } from 'react-query';

const useHeader = () => {
  const { showBrugerMenu, showBurger, showSearchMobile, showSearchMob } =
    useUiContext();

  const [showNotifications, setShowNotifications] = useState(false);

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

  const toggleNotifications = async () => {
    setShowNotifications((prev) => !prev);
  };

  const fetchNotifications = async () => {
    const response = await getNotifications();
    return response.data;
  };

  const { data: notifications } = useQuery('notifications', fetchNotifications);

  return {
    handleLogout,
    t,
    showBrugerMenu,
    showBurger,
    handleNavigation,
    router,
    showSearchMobile,
    showSearchMob,
    toggleNotifications,
    showNotifications,
    setShowNotifications,
    notifications,
  };
};
export default useHeader;
