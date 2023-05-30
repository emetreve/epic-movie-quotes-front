import { axiosInstance } from '@/services';

const googleAuth = async (googleAuthPath: string) => {
  const response = await axiosInstance.get(`/auth/callback${googleAuthPath}`);
  return response;
};

export default googleAuth;
