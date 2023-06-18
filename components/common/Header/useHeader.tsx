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
import { useQuery } from 'react-query';
import { usePusher } from '@/hooks';
import { NotificationMessage, Notification } from '@/types';
import { useQueryClient } from 'react-query';

const useHeader = (authUserId: number) => {
  const { showBrugerMenu, showBurger, showSearchMobile, showSearchMob } =
    useUiContext();

  const [showNotifications, setShowNotifications] = useState(false);

  const { t } = useTranslation(['newsfeed', 'profile']);

  const queryClient = useQueryClient();

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

  const handleMarkNotificationRead = (notification_id: number) => {
    try {
      // TODO: redirect to quote's modal view
      markNotification(notification_id);
      queryClient.invalidateQueries('notifications');
    } catch (error) {
      console.log(error);
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
    handleMarkNotificationsRead,
    handleMarkNotificationRead,
    notificationBellCounter,
  };
};
export default useHeader;
