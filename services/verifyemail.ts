import { axiosInstance } from '@/services';

const verifyEmail = async (verifyRoute: string) => {
  const response = await axiosInstance.get(verifyRoute);
  return response;
};

export default verifyEmail;
