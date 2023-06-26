import { axiosInstance } from '@/services';
import { AddCommentData } from '@/types';

const createComment = async (data: AddCommentData) => {
  const response = await axiosInstance.post('/create-comment', data);
  return response;
};

const createQuote = async (data: FormData) => {
  const response = await axiosInstance.post('/quotes', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const createMovie = async (data: FormData) => {
  const response = await axiosInstance.post('/movies', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const updateMovie = async (data: FormData, id: number) => {
  const response = await axiosInstance.post(`/movies/update/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const updateQuote = async (data: FormData, id: number) => {
  const response = await axiosInstance.post(
    `/quotes/${id}?_method=PATCH`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
};

export { createComment, createQuote, createMovie, updateMovie, updateQuote };
