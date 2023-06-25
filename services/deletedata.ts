import { axiosInstance } from '@/services';

const deleteQuote = async (id: number) => {
  const response = await axiosInstance.delete(`/quotes/${id}`);
  return response;
};

const deleteMovie = async (id: number) => {
  const response = await axiosInstance.delete(`/movies/${id}`);
  return response;
};

export { deleteQuote, deleteMovie };
