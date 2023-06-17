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

const getLike = async (user_id: number, quote_id: number) => {
  const response = await axiosInstance.get('/like', {
    params: {
      user_id,
      quote_id,
      like: 1,
    },
  });
  return response;
};

const broadcastLike = async () => {
  const response = await axiosInstance.get('/broadcastLike');
  return response;
};

const broadcastComment = async () => {
  const response = await axiosInstance.get('/broadcastComment');
  return response;
};

export { getQuotes, getMovies, getLike, broadcastLike, broadcastComment };
