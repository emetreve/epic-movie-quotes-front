import { axiosInstance } from '@/services';
import { ForgotPasswordFormData } from '@/types';
import { ResetPasswordFormData } from '@/types';

const forgotPassword = async (data: ForgotPasswordFormData) => {
  const response = await axiosInstance.post('/forgot-password', data);
  return response;
};

const resetPassword = async (data: ResetPasswordFormData) => {
  const response = await axiosInstance.post('/reset-password', data);
  return response;
};

export { forgotPassword, resetPassword };
