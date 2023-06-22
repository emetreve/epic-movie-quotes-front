import { axiosInstance } from '@/services';
import { AddCommentData } from '@/types';

const createComment = async (data: AddCommentData) => {
  const response = await axiosInstance.post('/create-comment', data);
  return response;
};

const createQuote = async (data: FormData) => {
  const response = await axiosInstance.post('/create-quote', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const createMovie = async (data: FormData) => {
  const response = await axiosInstance.post('/movie', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export { createComment, createQuote, createMovie };
