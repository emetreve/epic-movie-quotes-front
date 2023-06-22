import { axiosInstance } from '@/services';

const getQuotes = async (locale: string, page: number = 1, search?: string) => {
  const response = await axiosInstance.get('/quotes', {
    params: {
      locale,
      page,
      search,
    },
  });

  return response;
};

const getMovies = async () => {
  const response = await axiosInstance.get('/movies');
  return response;
};

const getUserMovies = async () => {
  const response = await axiosInstance.get('/user-movies');
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

const markNotification = async (notification_id: number) => {
  const response = await axiosInstance.get('/mark-one-read', {
    params: {
      notification_id,
    },
  });
  return response;
};

const getGenres = async () => {
  const response = await axiosInstance.get('/genres');
  return response;
};

export {
  getQuotes,
  getMovies,
  getUserMovies,
  getLike,
  getNotifications,
  markNotifications,
  markNotification,
  getGenres,
};
