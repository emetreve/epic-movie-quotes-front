import { axiosInstance } from '@/services';

const getQuotes = async (search?: string) => {
  let response;
  if (search) {
    response = await axiosInstance.get(`/quotes/?search=${search}`);
  } else {
    response = await axiosInstance.get('/quotes');
  }
  return response;
};

export { getQuotes };
