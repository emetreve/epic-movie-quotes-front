import { axiosInstance } from '@/services';

const getQuotes = async (locale: string, search?: string) => {
  let response;
  if (search) {
    response = await axiosInstance.get(
      `/quotes/?search=${search}&locale=${locale}`
    );
  } else {
    response = await axiosInstance.get(`/quotes/?locale=${locale}`);
  }
  return response;
};

export { getQuotes };
