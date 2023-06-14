import { axiosInstance } from '@/services';

const getQuotes = async (locale: string, search?: string) => {
  const response = await axiosInstance.get('/quotes', {
    params: {
      locale,
      search,
    },
  });

  return response;
};

export { getQuotes };
