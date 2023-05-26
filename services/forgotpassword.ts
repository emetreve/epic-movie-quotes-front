import { axiosInstance } from '@/services';
import { ForgotPasswordFormData } from '@/types';

const forgotPassword = async (data: ForgotPasswordFormData) => {
  const response = await axiosInstance.post('/forgot-password', data);
  return response;
};

export default forgotPassword;
