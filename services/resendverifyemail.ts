import { axiosInstance } from '@/services';

const resendVerifyEmail = async (id: string) => {
  const response = await axiosInstance.get(
    `/resend-email-verification-link/?id=${id}`
  );
  return response;
};

export default resendVerifyEmail;
