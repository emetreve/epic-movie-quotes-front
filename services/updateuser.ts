import { axiosInstance } from '@/services';
import { ChangeUserData, ChangeUserDataWithLocale } from '@/types';

const updateUser = async (data: ChangeUserData | ChangeUserDataWithLocale) => {
  const response = await axiosInstance.post('/edit-user-data', data);
  return response;
};

const updateAvatar = async (data: FormData) => {
  const response = await axiosInstance.post('/edit-user-data', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const changeEmailInDatabase = async (email: string) => {
  const response = await axiosInstance.post('/change-email', { email });
  return response;
};

export { updateUser, updateAvatar, changeEmailInDatabase };
