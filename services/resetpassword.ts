import { axiosInstance } from '@/services';
import { ResetPasswordFormData } from '@/types';

const resetPassword = async (data: ResetPasswordFormData) => {
  const response = await axiosInstance.post('/reset-password', data);
  return response;
};

export default resetPassword;
