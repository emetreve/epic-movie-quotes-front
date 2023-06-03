import { axiosInstance } from '@/services';

const editUsername = async (name: string) => {
  const response = await axiosInstance.get(`/edit-username?name=${name}`);
  return response;
};

export { editUsername };
