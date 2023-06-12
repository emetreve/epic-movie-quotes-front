import { axiosInstance } from '@/services';
import { AddCommentData } from '@/types';

const createComment = async (data: AddCommentData) => {
  const response = await axiosInstance.post('/create-comment', data);
  return response;
};

export { createComment };
