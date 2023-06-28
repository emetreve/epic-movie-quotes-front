import { axiosInstance } from '@/services';
import { FormData } from '@/types';

const signUp = async (incomingData: FormData, locale?: string) => {
  const params = locale ? { locale } : null;
  const response = await axiosInstance.post('/signup', incomingData, {
    params,
  });
  return response;
};

const logOut = async () => {
  const response = await axiosInstance.get('/logout');
  return response;
};

const googleAuth = async (googleAuthPath: string) => {
  const response = await axiosInstance.get(`/auth/callback${googleAuthPath}`);
  return response;
};

const verifyEmail = async (verifyRoute: string) => {
  const response = await axiosInstance.get(verifyRoute);
  return response;
};

export { signUp, logOut, googleAuth, verifyEmail };
