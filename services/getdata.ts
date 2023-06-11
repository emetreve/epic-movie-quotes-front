import { axiosInstance } from '@/services';

const getQuotes = async () => {
  const response = await axiosInstance.get('/quotes');
  return response;
};

export { getQuotes };
