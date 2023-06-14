import { axiosInstance } from '@/services';

const getQuotes = async (locale: string, search?: string) => {
  let response;

  if (search) {
    response = await axiosInstance.get('/quotes', {
      params: {
        locale,
        search,
      },
    });
  } else {
    response = await axiosInstance.get('/quotes', {
      params: {
        locale,
      },
    });
  }
  return response;
};

export { getQuotes };
