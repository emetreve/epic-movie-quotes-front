import { axiosInstance } from '@/services';
import { FormData } from '@/types';

const signUp = async (incomingData: FormData, locale?: string) => {
  let path;
  if (locale) {
    path = `/signup?locale=${locale}`;
  } else {
    path = '/signup';
  }
  const response = await axiosInstance.post(path, incomingData);
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
