import { axiosInstance } from '@/services';

const logOut = async () => {
  const response = await axiosInstance.get('/logout');
  return response;
};

export default logOut;
