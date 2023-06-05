import { axiosInstance } from '@/services';
import { ChangeUserData } from '@/types';

const updateUser = async (data: ChangeUserData) => {
  const response = await axiosInstance.post('/edit-user-data', data);
  return response;
};

export default updateUser;
