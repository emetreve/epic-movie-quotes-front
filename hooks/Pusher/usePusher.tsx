import { useEffect } from 'react';
import { axiosInstance } from '@/services';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Echo: Echo;
  }
}
const usePusher = () => {
  useEffect(() => {
    window.Echo = new Echo({
      Pusher,
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      cluster: 'eu',
      authorizer: (channel: { name: string }) => {
        return {
          authorize: (socketId: string, callback: Function) => {
            axiosInstance
              .post('/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                callback(null, response.data);
              })
              .catch((error) => {
                callback(error);
              });
          },
        };
      },
    });
  }, []);
};

export default usePusher;
