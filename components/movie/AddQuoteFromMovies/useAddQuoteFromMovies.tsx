import { useState } from 'react';
import { useUiContext } from '@/store';
import { useRouter, NextRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { CreateQuoteFormData } from '@/types';
import { createQuote } from '@/services';
import { useQueryClient } from 'react-query';

const useAddQuoteFromMovies = (movieId: string) => {
  const [imageName, setImageName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userId, setUserId] = useState('');

  const {
    showAddQuoteFromMoviesPage,
    showMovieDropdown,
    setShowMovieDropdown,
  } = useUiContext();

  const { locale } = useRouter() as NextRouter & { locale: 'en' | 'ka' };

  const { t } = useTranslation('profile');
  const { t: translate } = useTranslation('newsfeed');
  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues: {
      bodyEn: '',
      bodyGe: '',
      image: null,
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = methods;

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    if (selectedFile) {
      setImageName(selectedFile.name);
      clearErrors('image');
    }
  };

  const handleMovieExistence = (userId: string) => {
    setUserId(userId);
    if (!imageName) {
      setError('image', {
        type: 'manual',
        message: `${t('This field is required')}`,
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    setSelectedFile(selectedFile);
    setImageName(selectedFile.name);
    clearErrors('image');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onSubmit = async (data: CreateQuoteFormData) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile, selectedFile.name);
      formData.append('bodyGe', data.bodyGe);
      formData.append('bodyEn', data.bodyEn);
      formData.append('user_id', userId);
      formData.append('movie_id', movieId);

      try {
        await createQuote(formData);
        queryClient.invalidateQueries('movie');
      } catch (error: any) {
        const errors = error.response?.data?.errors;
        for (const field in errors) {
          if (field === 'image') {
            setError('image', {
              type: 'manual',
              message: `${t('image format error')}`,
            });
          } else if (field === 'bodyEn') {
            setError('bodyEn', {
              type: 'manual',
              message: `${t('This field is required')}`,
            });
          } else if (field === 'bodyKa') {
            setError('bodyGe', {
              type: 'manual',
              message: `${t('This field is required')}`,
            });
          }
        }

        return;
      }
    }
    reset();
    showAddQuoteFromMoviesPage(false);
  };

  return {
    showAddQuoteFromMoviesPage,
    locale,
    showMovieDropdown,
    setShowMovieDropdown,
    imageName,
    setImageName,
    handleUpload,
    handleSubmit,
    onSubmit,
    register,
    errors,
    handleMovieExistence,
    handleDrop,
    handleDragOver,
    t,
    translate,
  };
};
export default useAddQuoteFromMovies;
