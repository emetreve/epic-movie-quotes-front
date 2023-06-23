import { axiosInstance } from '@/services';

const deleteQuote = async (id: number) => {
  const response = await axiosInstance.delete(`/quotes/${id}`);
  return response;
};

export { deleteQuote };
