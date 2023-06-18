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

const getNotifications = async () => {
  const response = await axiosInstance.get('/notifications');
  return response;
};

const markNotifications = async (end_user_id: number) => {
  const response = await axiosInstance.get('/mark-all-read', {
    params: {
      end_user_id,
    },
  });
  return response;
};

export { getQuotes, getMovies, getLike, getNotifications, markNotifications };
