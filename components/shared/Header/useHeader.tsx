import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { logOut } from '@/services';
import { useTranslation } from 'next-i18next';
import { useUiContext, useQuotesContext } from '@/store';
import {
  getNotifications,
  markNotifications,
  markNotification,
} from '@/services';
import { useQuery, useQueryClient } from 'react-query';
import { Notification } from '@/types';

const useHeader = (authUserId: number) => {
  const [whichQuoteToView, setWhichQuoteToView] = useState<number | null>(null);
  const [whichQuoteToEdit, setWhichQuoteToEdit] = useState(null);
  const [editQuoteData, setEditQuoteData] = useState(null);

  const {
    showModal,
    modalSwitchSetter,
    setShowLangDropdown,
    showLangDropdown,
    showNotifications,
    setShowNotifications,
  } = useUiContext();

  const { setQuotesData } = useQuotesContext();

  const { t } = useTranslation(['newsfeed', 'profile']);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('notifications');
  }, [whichQuoteToView]);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {}
  };

  const handleNavigation = (address: string) => {
    const path = router.asPath;
    modalSwitchSetter(false, 'showBrugerMenu');
    if (path.includes(address) && !path.includes(`${address}/`)) {
      return;
    }
    if (address === 'newsfeed') {
      setQuotesData([]);
    }
    router.push(`/dashboard/${address}`);
  };

  const toggleNotifications = async (mobile?: boolean) => {
    if (mobile && !showNotifications) {
      document.body.classList.add('hide-scrollbar');
    } else if (mobile && showNotifications) {
      document.body.classList.remove('hide-scrollbar');
    }
    setShowNotifications(!showNotifications);
  };

  const fetchNotifications = async () => {
    const response = await getNotifications();
    return response.data;
  };

  const { data: notifications } = useQuery('notifications', fetchNotifications);

  const handleMarkNotificationsRead = () => {
    try {
      markNotifications(authUserId);
    } catch (error) {}
    queryClient.invalidateQueries('notifications');
  };

  const handleMarkNotificationRead = (notificationId: number) => {
    try {
      markNotification(notificationId);
      queryClient.invalidateQueries('notifications');
    } catch (error) {}
  };

  const handleNotificationClicked = (
    notificationId: number,
    toggle: boolean,
    quoteId: number
  ) => {
    handleMarkNotificationRead(notificationId);
    toggleNotifications(toggle);
    setWhichQuoteToView(quoteId);
  };

  const handleOutsideClick = () => {
    if (showLangDropdown) {
      setShowLangDropdown(!showLangDropdown);
    }
    if (showNotifications) {
      setShowNotifications(!showNotifications);
    }
  };

  const notificationBellCounter = notifications?.filter(
    (each: Notification) => {
      return each.end_user_id === authUserId && each.read === 0;
    }
  ).length;

  return {
    handleLogout,
    t,
    handleNavigation,
    router,
    showModal,
    modalSwitchSetter,
    toggleNotifications,
    showNotifications,
    setShowNotifications,
    notifications,
    handleNotificationClicked,
    handleMarkNotificationsRead,
    handleMarkNotificationRead,
    notificationBellCounter,
    whichQuoteToView,
    setWhichQuoteToView,
    whichQuoteToEdit,
    setWhichQuoteToEdit,
    editQuoteData,
    setEditQuoteData,
    setShowLangDropdown,
    showLangDropdown,
    handleOutsideClick,
  };
};
export default useHeader;
