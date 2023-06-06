import { axiosInstance } from '@/services';
import { ChangeUserData } from '@/types';

const updateUser = async (data: ChangeUserData) => {
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

export { updateUser, updateAvatar };
