import { useState } from 'react';
import { useRouter } from 'next/router';
import { logOut } from '@/services';
import { useTranslation } from 'next-i18next';
import { useUiContext } from '@/store';
import { getNotifications } from '@/services';
import { Notification } from '@/types';

const useHeader = () => {
  const { showBrugerMenu, showBurger, showSearchMobile, showSearchMob } =
    useUiContext();

  const [notifications, setNotifications] = useState<Notification[]>();
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

  const receiveNotifications = async () => {
    const response = await getNotifications();
    console.log(response);
    setNotifications(response.data);
    setShowNotifications((prev) => !prev);
  };

  return {
    handleLogout,
    t,
    showBrugerMenu,
    showBurger,
    handleNavigation,
    router,
    showSearchMobile,
    showSearchMob,
    receiveNotifications,
    showNotifications,
    setShowNotifications,
    notifications,
  };
};
export default useHeader;
