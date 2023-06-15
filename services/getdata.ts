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

const getMovies = async () => {
  const response = await axiosInstance.get('/movies');
  return response;
};

export { getQuotes, getMovies };
