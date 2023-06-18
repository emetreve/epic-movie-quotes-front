import { axiosInstance } from '@/services';

const pusherInstance = async (socket_id: string, channel_name: string) => {
  const response = await axiosInstance.post('/broadcasting/auth', {
    socket_id,
    channel_name,
  });
  return response;
};

export default pusherInstance;
