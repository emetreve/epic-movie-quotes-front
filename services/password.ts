import { axiosInstance } from '@/services';
import { ForgotPasswordFormData } from '@/types';
import { ResetPasswordFormData } from '@/types';

const forgotPassword = async (
  data: ForgotPasswordFormData,
  locale?: string
) => {
  let path;
  if (locale) {
    path = `/forgot-password/?locale=${locale}`;
  } else {
    path = 'forgot-password';
  }
  const response = await axiosInstance.post(path, data);
  return response;
};

const resetPassword = async (data: ResetPasswordFormData) => {
  const response = await axiosInstance.post('/reset-password', data);
  return response;
};

export { forgotPassword, resetPassword };
