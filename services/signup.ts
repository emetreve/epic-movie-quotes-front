import { axiosInstance } from '@/services';
import { FormData } from '@/types';

const signUp = async (incomingData: FormData) => {
  try {
    const response = await axiosInstance.post('/signup', incomingData);
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    return error;
  }
};

export default signUp;
