import { useEffect } from 'react';
import { pusherInstance } from '@/services';
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
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authorizer: (channel: { name: string }) => {
        return {
          authorize: async (socketId: string, callback: Function) => {
            try {
              const response = await pusherInstance(socketId, channel.name);
              return callback(null, response.data);
            } catch (error) {
              callback(error);
            }
          },
        };
      },
    });
  }, []);
};

export default usePusher;
