import { useEffect } from 'react';
import { usePusher } from '@/hooks';
import { NotificationMessage } from '@/types';
import { useQueryClient } from 'react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const useLayout = () => {
  const queryClient = useQueryClient();
  const { asPath } = useRouter();

  const authUserId = Number(Cookies.get('userId'));

  usePusher();
  useEffect(() => {
    const channelLike = window.Echo.private(
      `notification-updated.${authUserId}`
    );
    channelLike.listen(
      'NotificationUpdated',
      function (data: NotificationMessage) {
        queryClient.invalidateQueries('notifications');
      }
    );
    return () => {
      channelLike.stopListening(`.NotificationUpdated.${authUserId}`);
    };
  }, [authUserId, asPath]);

  return {};
};
export default useLayout;