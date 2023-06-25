import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { logOut } from '@/services';
import { useTranslation } from 'next-i18next';
import { useUiContext } from '@/store';
import {
  getNotifications,
  markNotifications,
  markNotification,
} from '@/services';
import { useQuery, useQueryClient } from 'react-query';
import { usePusher } from '@/hooks';
import { NotificationMessage, Notification } from '@/types';

const useHeader = (authUserId: number) => {
  const [whichQuoteToView, setWhichQuoteToView] = useState<number | null>(null);

  const { showBrugerMenu, showBurger, showSearchMobile, showSearchMob } =
    useUiContext();

  const [showNotifications, setShowNotifications] = useState(false);

  const { t } = useTranslation(['newsfeed', 'profile']);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('notifications');
  }, [whichQuoteToView]);

  usePusher();
  useEffect(() => {
    const channelLike = window.Echo.private(
      `notification-updated.${authUserId}`
    );
    channelLike.listen(
      'NotificationUpdated',
      function (data: NotificationMessage) {
        console.log(
          `private channel notification for the user with id ${authUserId} `,
          data
        );
        queryClient.invalidateQueries('notifications');
      }
    );
    return () => {
      channelLike.stopListening(`.NotificationUpdated.${authUserId}`);
    };
  }, [authUserId]);

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
    if (address === 'newsfeed') {
      setTimeout(() => {
        router.reload();
      }, 500);
    }
  };

  const toggleNotifications = async (mobile?: boolean) => {
    if (mobile && !showNotifications) {
      document.body.classList.add('hide-scrollbar');
    } else if (mobile && showNotifications) {
      document.body.classList.remove('hide-scrollbar');
    }
    setShowNotifications((prev) => !prev);
  };

  const fetchNotifications = async () => {
    const response = await getNotifications();
    return response.data;
  };

  const { data: notifications } = useQuery('notifications', fetchNotifications);

  const handleMarkNotificationsRead = () => {
    try {
      markNotifications(authUserId);
    } catch (error) {
      console.log(error);
    }
    queryClient.invalidateQueries('notifications');
  };

  const handleMarkNotificationRead = (notificationId: number) => {
    try {
      // TODO: redirect to quote's modal view (this view is not done yes)
      markNotification(notificationId);
      queryClient.invalidateQueries('notifications');
    } catch (error) {
      console.log(error);
    }
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

  const notificationBellCounter = notifications?.filter(
    (each: Notification) => {
      return each.end_user_id === authUserId && each.read === 0;
    }
  ).length;

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
    handleNotificationClicked,
    handleMarkNotificationsRead,
    handleMarkNotificationRead,
    notificationBellCounter,
    whichQuoteToView,
    setWhichQuoteToView,
  };
};
export default useHeader;
