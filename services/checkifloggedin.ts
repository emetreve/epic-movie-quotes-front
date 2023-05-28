import { axiosInstance } from '@/services';

const checkIfLoggedIn = async () => {
  const response = await axiosInstance.get('/check');
  return response;
};

export default checkIfLoggedIn;
