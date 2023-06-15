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

const getLike = async (authUserId: number, quote_id: number) => {
  const response = await axiosInstance.get('/like', {
    params: {
      user_id: authUserId,
      quote_id,
      like: 1,
    },
  });
  return response;
};

export { getQuotes, getMovies, getLike };
