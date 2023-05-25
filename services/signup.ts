import { axiosInstance } from '@/services';
import { FormData } from '@/types';

const signUp = async (incomingData: FormData) => {
  const response = await axiosInstance.post('/signup', incomingData);
  return response;
};

export default signUp;
